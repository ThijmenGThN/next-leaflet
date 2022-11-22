import { FiExternalLink } from 'react-icons/fi'

const features = [{
  name: "Tailwind",
  color: "bg-cyan-500",
  link: "https://tailwindcss.com"
}, {
  name: "Directus",
  color: "bg-purple-500",
  link: "https://directus.io"
}, {
  name: "React Icons",
  color: "bg-pink-500",
  link: "https://react-icons.github.io/react-icons"
}]

export default function Index() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-3 mt-5 font-bold">
        <p className="mt-1.5">NextJS</p>

        <span className="pt-2 pb-1 pl-3 pr-1 text-white bg-blue-500 rounded">
          TS
        </span>
      </div>

      <div className="flex flex-col gap-1 mx-5 mt-10">
        <p className="ml-2 font-bold">Included Features</p>
        <ul className="px-4 border-2 rounded-lg bg-neutral-100">
          {
            features.map((feature, key) => (
              <li key={key} className={"flex gap-3 " + (key < features.length - 1 && "border-b-2")}>
                <div className={"h-2 p-2 my-4 rounded-full aspect-square " + (feature.color)} />
                <p className='my-3 grow'>{feature.name}</p>
                <a href={feature.link} rel="noreferrer" target="_blank" className="p-1.5 my-2 border-2 rounded border-neutral-100 hover:border-neutral-200 hover:bg-white">
                  <FiExternalLink />
                </a>
              </li>
            ))
          }
        </ul>

        <p className="mt-2 ml-3 text-sm italic text-center">Template provided by mail@thijmenheuvelink.nl</p>
      </div>
    </div>
  )
}
