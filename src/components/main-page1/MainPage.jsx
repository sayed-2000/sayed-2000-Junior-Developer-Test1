import React, { useEffect, useState } from 'react';
import './MainPage.css';
import { nanoid } from 'nanoid';
import { date } from '../../data/Data';
import { Link } from 'react-router-dom';

function MainPage() {
    const [group, setGroup] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);


    useEffect(() => {
        let startData = localStorage.getItem("userData");
        setGroup(startData ? JSON.parse(startData) : []);
        // localStorage.removeItem("userData")
    }, []);

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    const [name, setName] = useState('');
    const [des, setDes] = useState('');




    async function handleSend(e) {
        e.preventDefault();

        if (isEditing) {
            let updatedArray = group.map(item =>
                item.id === currentId ? { ...item, name: name, dis: des } : item
            );
            setGroup(updatedArray);
            localStorage.setItem("userData", JSON.stringify(updatedArray));
            setIsEditing(false);
            setCurrentId(null);
        } else {
            let newObject = { id: nanoid().slice(10), name: name, dis: des, time: date() ,
                 post:[{id: "",name: "", dis: "", time: ""}] };
            let updatedArray = [...group, newObject];
            setGroup(updatedArray);
            localStorage.setItem("userData", JSON.stringify(updatedArray));
        }

        setName('');
        setDes('');
        toggleModal();
    }



    const handleEdit = (id) => {
        const itemToEdit = group.find(item => item.id === id);
        setName(itemToEdit.name);
        setDes(itemToEdit.dis);
        setCurrentId(id);
        setIsEditing(true);
        toggleModal();
    };


    const handleDelete = (id) => {
        const updatedArray = group.filter(item => item.id !== id);
        setGroup(updatedArray);
        localStorage.setItem("userData", JSON.stringify(updatedArray));
    };

    return (
        <>
            <div className="top">
                <p className='main__title'>Display <span>{group.length}</span> results</p>
                <button className='add' onClick={toggleModal}>Add A New Group</button>
            </div>
            <div className='main'> 
                <div className='itme'>
                    <p className="itme__id">ID</p>
                    <p className="itme__name">Name</p>
                    <p className="itme__des">Description</p>
                    <p className="itme__creat">CreatedAt</p>
                    <p className="action">Actions</p>
                </div>
                {group.length > 0 ? group.map((itme,index) => (
                  <div className='itme' key={index}>
                  <p className="itme__id">{itme.id}</p>
                  <p className="itme__name">{itme.name}</p>
                  <p className="itme__des">{itme.dis} </p>
                  <p className="itme__creat">{itme.time}</p>
                  <div className="itme__action">
                        <Link to={`/post/${itme.id}`}><button>view</button></Link>
                        <button onClick={() => handleEdit(itme.id)}> update</button>
                        <button onClick={() => handleDelete(itme.id)}> delete</button>
                  </div>
              </div>
        )):null}
            </div>

            <div className='main__s'> 
                {group.length > 0 ? group.map((itme,index) => (
                    <>
                    <div className='parent'>
                    <div className='itme'>
                        <p className="itme__id">ID</p>
                        <p className="itme__name">Name</p>
                        <p className="itme__des">Description</p>
                        <p className="itme__creat">CreatedAt</p>
                        {/* <p className="action">Actions</p> */}
                   </div>

                  <div className='itme' key={index}>
                  <p className="itme__id">{itme.id}</p>
                  <p className="itme__name">{itme.name}</p>
                  <p className="itme__des">{itme.dis} </p>
                  <p className="itme__creat">{itme.time}</p>
              </div>
              </div>
                <div className="itme__action">
                        <Link to={`/post/${itme.id}`}><button>view</button></Link>
                        <button onClick={() => handleEdit(itme.id)}> update</button>
                        <button onClick={() => handleDelete(itme.id)}> delete</button>
                  </div>
                  </>
        )):null}
            </div>

            {modal && (
                <form onSubmit={handleSend}>
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="registration">
                            <div className="input__registration">  
                                <h3>{isEditing ? "Update your Data ": "Create your Data"}</h3>
                                <input type="text" placeholder='Enter your name' onChange={e => setName(e.target.value)} value={name} />
                                <input type="text" placeholder='Enter the description' onChange={e => setDes(e.target.value)} value={des} />
                                <input className='bottom' type="submit" value="Send" />
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}

export default MainPage;
