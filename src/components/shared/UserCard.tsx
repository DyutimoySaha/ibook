import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user}: UserCardProps ) => {
  const {dark}=useContext(ThemeContext);
  return (
    <Link to={`/profile/${user.$id}`} className={`user-card !border-1 !border-primary-500 ${!dark?"shadow-md shadow-primary-500":""}`}>
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className={`base-medium ${!dark?"text-white":"text-[#000]"} text-center line-clamp-1`}>
          {user.name}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;