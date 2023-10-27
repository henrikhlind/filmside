import { BsPlayFill } from 'react-icons/bs'

export default function UIPage() {
    return (
        <div>
            <button className="bg-white rounded-full border-grey-darkest px-6 py-3 font-sans text-black font-medium flex items-center"><BsPlayFill/>Button text</button>
            <button className="border rounded-full border-grey-darkest px-6 py-3 font-sans text-white font-medium">Button text</button>
            <button className="bg-grey rounded-full border-grey-darkest opacity-25 px-3 py-2 shadow font-sans font-medium text-white backdrop-blur">Button text</button>
        </div>
    )
}
