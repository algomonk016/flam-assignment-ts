import React from "react";
import { DARK, GithubIcon  } from '../constant'

const Footer = () => {
  return (
    <div className="fixed flex justify-center items-center bottom-0 left-0 right-0 h-20 p-5 rounded-lg m-3 text-white" style={{ backgroundColor: DARK }} >
      Github Repo <a href={'https://github.com/algomonk016/flam-assignment'} target='_blank' > <img src={GithubIcon} className="w-8 h-8" /> </a>
    </div>
  )
}

export default Footer;