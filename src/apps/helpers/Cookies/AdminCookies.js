import React from 'react'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const setCookies = (name, value, path, cb) => {
    try{
        return !!(cookies.set(name, value, path))
    } catch(err){
        console.error(` setCookies :: ${name} : ${value}`)
        cb()
    }
}

export const getCookies = (name, cb) => {
    try{
        return cookies.get(name)
    }catch (err){
        console.log(` getCookies :: ${name}`)
        cb()
    }
}

export const removeCookies = (name, path, cb) => {
    try{
        return !!(cookies.remove(name, path))
    }catch (err){
        console.log(` removeCookies:: ${name}`)
        cb()
    }
}

