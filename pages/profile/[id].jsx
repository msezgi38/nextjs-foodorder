import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { signOut, useSession } from "next-auth/react"
import Account from '../../components/profile/Account'
import Order from '../../components/profile/Order'
import Password from '../../components/profile/Password'
import { useRouter } from "next/router"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios'

const Profile = ({ user }) => {
  const { data: session } = useSession()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tabs, setTabs] = useState(0)
  const { push } = useRouter()
  const handleSignOut = () => {
    signOut({ redirect: false })
    push("/auth/login")
  }

  useEffect(() => {
    if (!session) {
      push("/auth/login")
    }
  }, [session, push])


  return (
    <div className='flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10'>
      <div className='lg:w-80 w-100 flex-shrink-0'>
        <div className='relative flex flex-col items-center  px-10 py-5 border border-b-0'>
          <Image
            src={user.image ? user.image : "/images/client2.jpg"}
            alt=""
            width={100}
            height={100}
            className="rounded-full " />
          <b className='text-2xl mt-1'>{user.fullName}</b>
        </div>
        <div>
          <ul className='text-center font-semibold'>
            <li className={`border  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 0 && "bg-primary text-white"}`} onClick={() => setTabs(0)}>
              <i className='fa fa-home'></i>
              <button className='ml-1'>Account</button>
            </li>
            <li className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 1 && "bg-primary text-white"}`} onClick={() => setTabs(1)}>
              <i className='fa fa-key'></i>
              <button className='ml-1'>Password</button>
            </li>
            <li className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 2 && "bg-primary text-white"}`} onClick={() => setTabs(2)}>
              <i className='fa fa-motorcycle'></i>
              <button className='ml-1'>Orders</button>
            </li>
            <li className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `} onClick={handleOpen}>
              <i className='fa fa-sign-out'></i>
              <button className='ml-1'>Exit</button>
            </li>
          </ul>
          <Modal open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                Are you sure?
              </Typography>
              <div className='flex '>
                <button className='btn-primary ml-20 mt-10' onClick={handleSignOut}>Yes</button>
                <button className='btn-primary !bg-secondary  ml-7 mt-10' onClick={handleClose}>No</button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      {tabs === 0 && (<Account user={user} />)}
      {tabs === 1 && (<Password user={user} />)}
      {tabs === 2 && (<Order />)}
    </div>
  )
}
export async function getServerSideProps({ req, params }) {

  const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`)
  return {
    props: {
      user: user ? user.data : null,
    }
  }
}


export default Profile
