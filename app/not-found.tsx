import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-2xl font-semibold'>Not Found</h2>
      <p className='text-sm text-gray-500'>Could not find requested resource</p>
      <Link className='text-blue-500 hover:text-blue-700 underline text-center' href="/">Return Home</Link>
    </div>
  )
}