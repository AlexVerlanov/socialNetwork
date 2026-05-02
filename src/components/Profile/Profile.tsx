import React from "react";
import styled from "styled-components";
import type { ProfileType } from "../../redux/Profile-reducer";
import { Preloader } from "../common/Prealoader/Preloader";
import userPhoto from "../../assets/img/photo.png";

/* ——— styles ——— */

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 2260px; /* чтобы содержимое не растягивалось бесконечно */
  position: relative;
  margin-bottom: 90px; /* место под «нависающий» аватар */
`;

const Banner = styled.img`
  width: 100%;
  height: 70vh; /* займёт 40% от высоты экрана */
  object-fit: cover;
  border-radius: 10px;
  display: block;
`;

const Avatar = styled.img<{ $hasAvatar: boolean }>`
  position: absolute;
  left: 24px;
  bottom: -135px; /* Уменьшаем отступ, чтобы аватарка опустилась ниже */
  width: 380px;
  height: 380px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  @media (max-width: 2624px) {
    width: 200px;
    height: 200px;
    bottom: -240px;
    left: 18px;
  }
  @media (max-width: 2224px) {
    width: 200px;
    height: 200px;
    bottom: -150px;
    left: 18px;
  }
  @media (max-width: 2024px) {
    width: 200px;
    height: 200px;
    bottom: -240px;
    left: 18px;
  }
  @media (max-width: 1524px) {
    width: 200px;
    height: 200px;
    bottom: -220px;
    left: 18px;
  }
  @media (max-width: 1024px) {
    width: 130px;
    height: 130px;
    bottom: -150px;
    left: 18px;
  }
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    bottom: -150px;
    left: 16px;
  }
  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    bottom: -150px;
    left: 12px;
  }
`;

/* ——— component ——— */

type ProfileProps = {
  profile: ProfileType | null | undefined;
};

export const Profile: React.FC<ProfileProps> = ({ profile }) => {
  // можно показать прелоадер, если профиля ещё нет вовсе
  if (profile == null) {
    return <Preloader />;
  }

  const hasAvatar = Boolean(profile.photos?.large);
  const avatarSrc = hasAvatar ? (profile.photos!.large as string) : userPhoto;

  return (
    <ProfileContainer>
      <ImageWrapper>
        <Banner
          src="https://avatanplus.com/files/resources/original/5b7c1efd295881655cd90cf1.jpg"
          alt="Cover"
        />

        <Avatar
          $hasAvatar={hasAvatar}
          src={avatarSrc}
          alt="Profile"
          // если серверная аватарка битая — подставим заглушку
          onError={(e) => {
            if ((e.currentTarget as HTMLImageElement).src !== userPhoto) {
              (e.currentTarget as HTMLImageElement).src = userPhoto;
            }
          }}
        />
      </ImageWrapper>
    </ProfileContainer>
  );
};
