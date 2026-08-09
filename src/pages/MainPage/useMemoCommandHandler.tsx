import useDebouncer from "@/hooks/useDebouncer";
import type Memo from "@/models/Memo";
import MemoToMemoDTO from "@/models/MemoToMemoDTO";
import MemoToMemoDTOPartial from "@/models/MemoToMemoDTOPartial";
import apiDeleteMemo from "@/services/apiDeleteMemo";
import apiSetMemo from "@/services/apiSetMemo";
import apiUpdateMemo from "@/services/apiUpdateMemo";
import { useCallback, useState } from "react";

export interface CreateCommand {
    type: "create",
    id: string
    data: Memo
}
export interface UpdateCommand {
    type: "update",
    id: string
    data: Partial<Memo>
}
export interface DeleteCommand {
    type: "delete",
    id: string
}
export type MemoCommand = CreateCommand | UpdateCommand | DeleteCommand

const DEBOUNCER_DELAY = 2000;

function appendCommand(queue: MemoCommand[], cmd: MemoCommand) {
    switch (cmd.type) {
        case "update":
            {
                const lastCmd = queue[queue.length - 1];
                if (lastCmd != undefined && lastCmd.type == cmd.type && lastCmd.id == cmd.id) {
                    // Combine Edit Command
                    const combinedCmd = {
                        ...cmd,
                        data: {
                            ...lastCmd.data,
                            ...cmd.data,
                        }
                    }
                    return [...queue.toSpliced(queue.length - 1), combinedCmd]
                }
                else {
                    return [...queue, cmd]
                }
            }
        default:
            return [...queue, cmd]
    }
}
async function doCommand(cmd: MemoCommand) {
    switch (cmd.type) {
        case "create":
            return apiSetMemo(cmd.id, MemoToMemoDTO(cmd.data))
        case "update":
            return apiUpdateMemo(cmd.id, MemoToMemoDTOPartial(cmd.data))
        case "delete":
            return apiDeleteMemo(cmd.id)
    }
}

/**
 * Handles async memo api calls
 */
export default function useMemoCommandHandler() {
    const [flushing, setFlushing] = useState(false);
    const [commandQueue, setCommandQueue] = useState<MemoCommand[]>([])

    const flushQueueDebouncer = useDebouncer((queue: MemoCommand[]) => {
        (async () => {
            setFlushing(true)
            await Promise.all(
                queue.map(doCommand)
            )
            setCommandQueue([])
            setFlushing(false)
        })()
    }, DEBOUNCER_DELAY);

    const pushCommand = useCallback((cmd: MemoCommand) => {
        const newQueue = appendCommand(commandQueue, cmd)
        setCommandQueue(newQueue)
        flushQueueDebouncer.call(newQueue)
    }, [commandQueue, flushQueueDebouncer])

    return {
        pushCommand,
        flushing,
    }
}