"use client"
import React, { useEffect, useState } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import axios from 'axios'
import { UserDetailContext } from '@/context/UserDetailContext'
const Provider = ({ children }: { children: React.ReactNode }) => {
      const [user, setUser] = useState<any>(null);
      useEffect(() => {
            CreateNewUser();
      }, []);

      const CreateNewUser = async () => {
            try {
                  //user APi end point
                  const { data: user } = await axios.post('/api/user', {});
                  setUser(user);
            } catch (error) {
                  console.log(error);
            }
      }
      return (
            <UserDetailContext.Provider value={{ user, setUser }}>
                  {children}
            </UserDetailContext.Provider>
      )
}
export default Provider;
