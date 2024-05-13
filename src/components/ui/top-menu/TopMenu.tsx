import { ButtonOpenMenu } from "@/components";
import { titleFont } from "@/config/fonts";
import Link from "next/link"
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

export const TopMenu = () => {
  return (
    <nav className="flex flex-row px-5 justify-between items-center m-2">
        <div>
            <Link href="/" >
                <span
                className={`${titleFont.className} antialiased font-bold`}
                >System</span>
                <span>| Hermes</span>
            </Link>
        </div >
      <ButtonOpenMenu/>

    </nav>
  )
}
