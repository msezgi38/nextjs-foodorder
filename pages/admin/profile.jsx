import Image from 'next/image'
import React, { useState } from 'react'
import Products from "../../components/admin/Products";
import Order from '../../components/admin/Order';
import Category from '../../components/admin/Category';
import Footer from '../../components/admin/Footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from "react-toastify"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddProduct from "../../components/admin/AddProduct";

const Profile = () => {
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
  const [isProductModal, setIsProductModal] = useState(false);
  const { push } = useRouter()
  const closeAdminAccount = async () => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`)
      if (res.status === 200) {
        push("/admin")
        toast.success("Admin Account Closed")
      }

    } catch (err) {
      console.log(err);
    }
  }
  return (

    <div className='flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10'>
      <div className='lg:w-80 w-100 flex-shrink-0'>
        <div className='relative flex flex-col items-center  px-10 py-5 border border-b-0'>
          <Image
            src="/images/admin.png"
            alt=""
            width={100}
            height={100}
            className="rounded-full " />
          <b className='text-2xl mt-1'>Admin</b>
        </div>
        <div>
          <ul className='text-center font-semibold'>
            <li className={`border  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 0 && "bg-primary text-white"}`} onClick={() => setTabs(0)}>
              <i className='fa fa-cutlery'></i>
              <button className='ml-1'>Products</button>
            </li>
            <li className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 1 && "bg-primary text-white"}`} onClick={() => setTabs(1)}>
              <i className='fa fa-motorcycle'></i>
              <button className='ml-1'>Orders</button>
            </li>
            <li className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 2 && "bg-primary text-white"}`} onClick={() => setTabs(2)}>
              <i className='fa fa-ellipsis-h'></i>
              <button className='ml-1'>Categories</button>
            </li>
            <li className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 3 && "bg-primary text-white"}`} onClick={() => setTabs(3)}>
              <i className='fa fa-window-maximize'></i>
              <button className='ml-1'>Footer</button>
            </li>
            <li
              className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 4 && "bg-primary text-white"
                }`}
              onClick={handleOpen}
            >
              <i className="fa fa-sign-out"></i>
              <button className="ml-1">Exit</button>
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
                <button className='btn-primary ml-20 mt-10' onClick={closeAdminAccount}>Yes</button>
                <button className='btn-primary !bg-secondary  ml-7 mt-10' onClick={handleClose}>No</button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      {tabs === 0 && (<Products />)}
      {tabs === 1 && (<Order />)}
      {tabs === 2 && (<Category />)}
      {tabs === 3 && (<Footer />)}
      {isProductModal && <AddProduct setIsProductModal={setIsProductModal} />}
      <button
        className="btn-primary !w-12 !h-12 !p-0 absolute bottom-14 right-10 text-4xl"
        onClick={() => setIsProductModal(true)}
      >
        +
      </button>
    </div>
  )
}
export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || ""
  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
export default Profile
