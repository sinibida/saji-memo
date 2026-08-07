import type { Timestamp } from "firebase/firestore";

export default interface MemoDTO {
    id: string;
    title: string;
    content: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}