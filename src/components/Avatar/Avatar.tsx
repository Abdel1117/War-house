import { AvatarType } from "../../types/avatarType/avatarType";
export const Avatar = ({
  imgSrc,
  userName,
  displayName = false,
}: AvatarType) => {
  return (
    <div className="flex items-start">
      <img
        className="w-[35px] h-[35px] rounded-full"
        src={imgSrc}
        alt={`Avatar image de ${userName}`}
      />
      {displayName ? <p>{userName}</p> : null}
    </div>
  );
};
