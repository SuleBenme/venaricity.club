import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import {list} from './api-stats.js'
import { stubString } from 'lodash'

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: 100,
        paddingLeft: 50,
        paddingRight: 50,
        maxWidth: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        boxSizing: 'border-box',
    },
    table: {
        display: 'table',
        minWidth:' 100%',
        whiteSpace: 'nowrap',
    },
    header: {
        display:' table-header-group',
    },
    tableHeaderRow: {
        display: 'table-row'
    },
    tableHeaderCell: {
        display: 'table-cell',
        //font-family: var(--ea-theme-typographic-headings-font-family);
        fontSize: '18px',
        fontWeight: 700,
    },
    headerText: {
        alignItems: 'center',
        backgroundColor: '#8a4fff',
        borderRadius: '3px',
        color: '#fff',
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
        padding:' 12px 16px 12px 20px',
        textDecoration: 'none',
        width: 'calc(100% - 4px)',
        boxSizing: 'border-box',
    },
    tableBody: {
        display: 'table-row-group',
    },
    tableData: {
        borderBottom: '1px solid #eaeaea',
        display: 'table-cell',
        //font-family: var(--ea-theme-secondary-font-family);
        margin: 0,
        verticalAlign: 'middle',

        '& span': {
            display: 'block',
            height: '79px',
            padding: '32px 16px 16px 20px',
            boxSizing: 'border-box',
            '& div': {
                display: 'flex',
                boxSizing: 'border-box',
            }

        }
    },
    tableMembersColumn: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        paddingLeft: '20px',
        top: '-24px',
    },
    bigAvatar: {
        width: 60,
        height: 60,
        //margin: 10,
        transform: 'translateY(-23px)'
    }, 
    position: {
        margin: '4px 0 0 0',
        padding: 0,
        textTransform: 'capitalize'
    },
    name: {
        fontWeight: 700,
        marginTop: '13px',
        fontSize: '20px',
    },
}))

export default function Members() {
    const classes = useStyles()
    const [stats, setStats] = useState()


    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setStats(data.memberStats.members)
            }
        })

        return function cleanup(){
          abortController.abort()
        }
    }, [])

    //console.log(stats)

    return(
    <div className={classes.wrapper}>

        <div className={classes.table}>

            <div className={classes.header}>
                <div className={classes.tableHeaderRow}>
                    <div className={classes.tableHeaderCell}>
                        <span className={classes.headerText}>Member</span>
                    </div>

                    <div className={classes.tableHeaderCell}>
                        <span className={classes.headerText}>Overall Rating</span>
                    </div>

                    <div className={classes.tableHeaderCell}>
                        <span className={classes.headerText}>Games Played</span>
                    </div>

                    <div className={classes.tableHeaderCell}>
                        <span className={classes.headerText}>Goals</span>
                    </div>

                    <div className={classes.tableHeaderCell}>
                        <span className={classes.headerText}>Assists</span>
                    </div>

                    <div className={classes.tableHeaderCell}>
                        <span className={classes.headerText}>Tackles</span>
                    </div>

                    <div className={classes.tableHeaderCell}>
                        <span className={classes.headerText}>Passes</span>
                    </div>

                    <div className={classes.tableHeaderCell}>
                        <span className={classes.headerText}>Win %</span>
                    </div>
           
                </div>
            </div>

            {stats && stats.map((member) => {
            return (
            <div className={classes.tableBody}>
                <div className={classes.tableData}>
                    <span>
                        <div>
                            <Avatar className={classes.bigAvatar}/>
                            <div className={classes.tableMembersColumn}>
                                <div className={classes.position}>{member.favoritePosition}</div>
                                <div className={classes.name}>{member.name}</div>
                            </div>
                        </div>
                    </span>
                </div>
                

                <div className={classes.tableData}>
                    <span>
                        {member.proOverall}
                    </span>
                </div>

                <div className={classes.tableData}>
                    <span>
                        {member.gamesPlayed}
                    </span>
                </div>

                <div className={classes.tableData}>
                    <span>
                        {member.goals}
                    </span>
                </div>

                <div className={classes.tableData}>
                    <span>
                        {member.assists}
                    </span>
                </div>  

                <div className={classes.tableData}>
                    <span>
                        {member.tacklesMade}
                    </span>
                </div>  

                <div className={classes.tableData}>
                    <span>
                        {member.passesMade}
                    </span>
                </div>

                <div className={classes.tableData}>
                    <span>
                        {member.winRate}
                    </span>
                </div>          
            </div>
            )})}
        </div>

    </div>)
}