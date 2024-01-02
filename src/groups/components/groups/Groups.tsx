import React, { useContext } from 'react'
import styles from './Groups.module.css'
import { GroupCard } from '../group_card/GroupCard'
import { GroupsContext } from 'src/groups/context/GroupsContext'
import { useNavigate } from 'react-router-dom';

export const Groups = () => {
    const navigate = useNavigate()
    const {groups} = useContext(GroupsContext)
    const navigateToGroupPage = (id: string) => {
        navigate("/group", {state: {id: id}})
    }
    return (
        <ul>
            {
                groups.map(group => 
                    <li 
                    key={group.id}
                    onClick={() => navigateToGroupPage(group.id)}
                    >
                        <GroupCard group={group} />
                    </li>
                )
            }
        </ul>
    )
}