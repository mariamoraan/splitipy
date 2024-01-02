import { createContext } from "react";
import { IGroup } from "../interfaces/Group";

export type IGroupsContext = {
    groups: IGroup[],
    setGroups: (groups: IGroup[]) => void,
}
export const GroupsContext = createContext<IGroupsContext>({
    groups: [],
    setGroups: (groups) => {}
})