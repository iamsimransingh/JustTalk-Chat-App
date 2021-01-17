const users=[];//array of users
const addUser = ({id,name,room}) => {//helper func to add users
 name=name.trim().toLowerCase();//to make the room name in one string without spaces and get in lowercase
 room=room.trim().toLowerCase();

const existingUser = users.find((user)=>user.room === room && user.name === name);//to find a exixsting user in users array with which a new user is trying to sign
if(!name || !room) return { error: 'Username and room are required.' };
if(existingUser) return{error: 'UserName is taken'};

const user = {id, name, room};
users.push(user);//adding new user to the users array
return {user};//returning user to know exactly which new user was pushed to the array
}

const removeUser = (id) => {//to remove users
 const index = users.findIndex((user)=>user.id === id);//find user with that specific id to remove from array
if(index!==-1)
    return users.splice(index,1)[0];//remove the user from array}
}

const getUser = (id) => users.find((user)=>user.id === id);//helper func to get users

const getUsersInRoom=(room) => users.filter((user)=>user.room === room);//helper func to get users in specific rooms

module.exports = { addUser,removeUser,getUser,getUsersInRoom};//exporting the functions of users
