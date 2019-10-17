import React,{ Component } from "react";
import { Table } from 'reactstrap';
import { getUser } from '../../apis/storage';
import { getAllTask, getTaskById } from "../../apis/task";
import UserTaskRow from "../Row/usertaskrow";
export default class UserTask extends Component{
   constructor(props){
      super(props);
      this.state = {
         tasks:[],
         complete:[],
         //changed:null
      }
   }

   

   componentDidMount(){
      this.getUserTaskDetails()
   }

   async getUserTaskDetails(){
      try{
         const res = await getAllTask();
         const user = getUser();
         console.log(user.user.taskid)
         user.user.taskid.map(async (id,index)=>{
            const temp = await getTaskById(id);
           this.state.tasks.push(temp.data);
           this.setState({complete:this.state.tasks})
         })
         console.log(this.state.complete)
        
      }
      catch(e){}
   }

   render(){
      return(
         <Table responsive className="text-center">
            <thead className="thead-light">
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Project</th>
              <th>Priority</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Message</th>
              <th>Mark it as complete</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.tasks.map((task,index)=>{
                 console.log("Task ==>",task)
                return <UserTaskRow  messageid={task.messageid} changed={this.state.changed} status={task.status} id={task._id} name={task.name} project={task.projectid}  priority={task.priority} startdate={task.startdate} enddate={task.enddate} toggleChanged={this.props.toggleChanged}/>
              })
            }
            </tbody>
         </Table>
      )
   }
}