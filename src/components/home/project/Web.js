import React, { useEffect, useState } from 'react'
import {Button,EditableText,InputGroup,Toaster}  from '@blueprintjs/core'
import './Web.css';
const apptoaster=Toaster.create({
    position: "top"
})
function Web() {
    const [users, setusers] = useState([]);
    const [sname,setsname]=useState("");
    const [semail,setsemail]=useState("");
    const [swebsite,setswebsite]=useState("");

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => setusers(json))
    }, [])
    function handler(){
          const name=sname.trim();
        const email=semail.trim();
        const website=swebsite.trim();

        if (name && email && website)
        {
            fetch('https://jsonplaceholder.typicode.com/users'
            ,{
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    website
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }
            ).then((response)=>response.json() )
            .then(data=>{
                setusers([...users,data]);
                apptoaster.show({
                    message: "sucessfully",
                    intent: "success",
                    timeout: 3000
                })
                setsname("");
                setsemail("");
                setswebsite("");
            })
        }
    }
function onchangehandler(id,key,value){
    setusers((users)=>{
        return users.map(user =>{
            return user.id=== id ? {...user,[key]:value}:user;
        })
    })
    
}
function supdate(id)
{
    const user=users.find((user)=> user.id===id);
        fetch(`https://jsonplaceholder.typicode.com/users/10`,
        {
            method:"PUT",
            body: JSON.stringify(user),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"

            }

        }).then((response)=>response.json())
        .then(data=>{
            // setusers([...users,data]);
            apptoaster.show({
                message:"update success",
                intent:"success",
                timeout:3000
            })
        })
}
function sdel(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
    {
        method: "DELETE",

    })
    .then(response=>response.json())
    .then(data=>{
        setusers((users)=>{
            return users.filter(user=>user.id!== id)
        })
        apptoaster.show({
            message:"delete success",
            intent:"danger",
            timeout:3000
        })
    })
    
}

    // className="bp4-html-table modifier"
    return (
        <div className="App">
            
            <table >
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Actions</th>

                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td><EditableText onChange={value=>onchangehandler(user.id,'email',value)} value={user.email}/></td>
                            <td><EditableText onChange={value=>onchangehandler(user.id,'website',value)} value={user.website}/></td>
                            <td>
                    <Button intent="primary" onClick={()=>supdate(user.id)}>Edit</Button> 
                    &nbsp;<Button intent="danger" onClick={()=>sdel(user.id)}>Delete</Button>
                    </td>

                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td><InputGroup value={sname}
                        onChange={(e)=>setsname(e.target.value)}/> </td>
                        <td><InputGroup value={semail}
                        onChange={(e)=>setsemail(e.target.value)}/> </td>
                        <td> <InputGroup value={swebsite}
                        onChange={(e)=>setswebsite(e.target.value)}/> </td>
                  <td>
                    <Button intent="success" onClick={handler}>Add user</Button>
                    </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Web