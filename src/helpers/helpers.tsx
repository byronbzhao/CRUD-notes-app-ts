import { useOutletContext } from "react-router-dom";
import { NoteType } from "../interfaces";

export function useNote() {
    return useOutletContext<NoteType>()
}