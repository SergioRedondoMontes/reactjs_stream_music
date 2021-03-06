import Axios from "core/axios";
import AuthJWT from "core/AuthJWT";

class MusicServices {
  constructor() {
    this.service = new Axios();
  }

  getMusic = (data) => {
    let response = [
      {
        _id: "sdjasdjknsadjndsjkasd23",
        name: "Despacito",
        singer: "Luis Fonsi",
        cover:
          "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
        musicSrc:
          "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
      },
      {
        _id: "sdjasdjknsadjndsjkasd56",
        name: "Bedtime Stories",
        singer: "Jay Chou",
        cover:
          "http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg",
        musicSrc:
          "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3",
      },
      {
        _id: "sdjasdjknsadjndsjkasd78",
        name: "Dorost Nemisham",
        singer: "Sirvan Khosravi",
        cover:
          "https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg",
        musicSrc:
          "https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3",
      },
    ];

    return Promise.resolve(response);
  };

  downloadMusic = () => {
    return this.service.get("/music").then((response) => {
      console.log(response);
      return [
        ...response.data.songs.map((song) => ({
          ...song,
          artist: song.artist.join(" | "),
        })),
      ];
    });
  };

  uploadMusic = (data) => {
    const formData = new FormData();
    formData.append("song", data);
    return this.service.post("/singer/upload", formData);
  };
}

export default MusicServices;
