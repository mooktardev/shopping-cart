import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='container mx-auto'>
        <hr className='border border-dark-7' />
        <p className="text-semibold text-center py-10 text-dark-5">
            &copy; Savana Shop - An DEMO shop website. Build with 💗 by <Link to="mailto:mooktardev1@gmail.com">Mooktar</Link>.
        </p>
    </div>
  )
}
