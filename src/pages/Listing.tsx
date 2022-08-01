import {Icon, IconButton, Tooltip } from '@mui/material';
import moment from 'moment';
import React,{useState} from 'react';
import DataTable from 'react-data-table-component';
import {Link as RLink} from 'react-router-dom';


const Listing = (props:any)=>{
    const [tagDialog,setTagDialog]:any = useState({open:false,row:{}});
    
    const handlerShowTagDialog = (row:any)=>{
        setTagDialog({...tagDialog,open:true,row:row});
    }

    const columns:any = [
        {
          name: 'Call Type',
          selector: 'call_type',
          compact:true,
          //width:'170px',
          hide:600,

        },  
        {
            name: 'Direction',
            selector: 'direction',
            compact:true,
            //width:'170px',
            hide:600,
        },
        {
            name: 'Duration',
            selector: 'duration',
            compact:true,
            width:'160px',
            hide:1200
        },
        {
            name: 'From',
            selector: 'from',
            compact:true,
            // hide:1200
        },
        {
            name: 'To',
            selector: 'to',
            compact:true,
            // hide:1200
        },
        {
            name: 'Via',
            selector: 'via',
            compact:true,
            hide:1200
        },
        {
            name: 'Created at',
            selector: 'created_at',
            width:'120px',
            compact:true,
            hide:1200,
            cell:(row:any)=><>{moment(row.created_at).format('DD-MM-YYYY')}</>
        },
        {
            name: 'Actions',
            compact:true,
            width:'100px',
            right:true,
            cell:(row:any) => 
                <>
                    <>
                    <Tooltip title="Add Note" >
                        <IconButton size="small" className="action" component={RLink} to={`/calls/${row.id}`}>
                            <Icon className="icon-green">edit</Icon>
                        </IconButton>
                    </Tooltip>
                
                    
                       {row.is_archived? <Tooltip title="Unarchive">
                            <IconButton size="small" className="action danger" onClick={()=>{props.onActivate(row)}} >
                                <Icon className="icon-red">undo</Icon>
                            </IconButton>
                        </Tooltip>:<Tooltip title="Archive">
                            <IconButton size="small" className="action danger" onClick={()=>{props.onDelete(row)}} >
                                <Icon className="icon-red">archive_rounded_icon </Icon>
                            </IconButton>
                        </Tooltip>}
                    
                    </>
                
                </>
          }
      ];
    return(
        <>
        <DataTable
            title=""
            noHeader={true}
            columns={columns}
            dense={true}
            data={props.data.rows}
            highlightOnHover={true}
            pagination={true}
            paginationServer={true}
            paginationTotalRows={props.data.count}
            paginationPerPage={props.rowPerPage}
            paginationComponentOptions={ {noRowsPerPage: true}}
            paginationDefaultPage={1}
            paginationResetDefaultPage={1==1}
            onChangePage={(page:number)=>{props.onPagingChange({page:page})}}
         
            
        />
        
        </>
    )
}





export default Listing;