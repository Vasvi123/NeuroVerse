// import React, { useState } from "react";
// import "../styles.css";

// const Inspire = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const people = [
//     {
//       name: "Abhishek Bachchan",
//       img: "https://www.bing.com/images/search?view=detailV2&ccid=trdBPLkh&id=BAE8FAE1D2ADAB2758AB77C86AA86BE06AF50A79&thid=OIP.trdBPLkh0BzRdqc-Wy-FtwHaJ4&mediaurl=https%3a%2f%2ffilmfare.wwmindia.com%2fcontent%2f2020%2fsep%2fabhishekbachchan21599807057.jpg&exph=1200&expw=900&q=abishek+bacchan&simid=608032941984195044&FORM=IRPRST&ck=D8AB3633FB3464A98AF38187FCCC92E1&selectedIndex=2&itb=0",
//       desc: "Diagnosed with dyslexia at the age of nine, Abhishek struggled with reading and writing during school. Despite these challenges, he pursued a career in acting and became a celebrated Bollywood star. Today, he speaks about learning disabilities, helping raise awareness about dyslexia in India.",
//     },
//     {
//       name: "Alia Bhatt",
//       img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Alia_Bhatt_at_68th_Filmfare_Awards_2023_%28cropped%29.jpg",
//       desc: "Alia Bhatt has publicly shared her struggles with ADHD, a condition that made it difficult for her to focus in school. Despite this, she developed a successful acting career, proving that neurodivergence is not a limitation but a unique way of thinking and processing the world.",
//     },
//     {
//       name: "Fahadh Faasil",
//       img: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Fahadh_Faasil_at_22nd_Kerala_International_Film_Festival.jpg",
//       desc: "Award-winning Indian actor Fahadh Faasil was diagnosed with ADHD at 41. He has spoken about the challenges of undiagnosed neurodivergence in adulthood and how understanding his condition has helped him in his creative and personal life.",
//     },
//     {
//       name: "Sabyasachi Gorai",
//       img: "https://www.ldexplained.org/wp-content/uploads/2020/04/Sabyasachi-Gorai.jpg",
//       desc: "Celebrity chef Sabyasachi Gorai overcame dyslexia by relying on his strong visual and sensory memory. His learning style allowed him to master cooking in a unique way, making him one of India's most successful chefs today.",
//     },
//     {
//       name: "Pranav Bakhshi",
//       img: "https://i.ytimg.com/vi/N6SFa9lEZak/maxresdefault.jpg",
//       desc: "India’s first model with autism, Pranav Bakhshi has broken stereotypes in the fashion industry. He has worked with major brands and advocates for autism acceptance, proving that neurodivergent individuals can thrive in unconventional fields.",
//     },
//     {
//       name: "Temple Grandin",
//       img: "https://www.malvikaiyer.com/assets/img/malvika-iyer-profile.jpg",
//       desc: "Temple Grandin, an animal behaviorist and autism advocate, transformed livestock handling with her humane designs. Diagnosed with autism, her ''thinking in pictures'' unlocked unique insights into animal behavior. A celebrated author, scientist, and inspiration, her life emphasizes the strength of neurodiversity. Her story even inspired the Emmy-winning film Temple Grandin.",
//     },
//   ];

//   const toggleInfo = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="inspire-section">
//       <h2 className="title">Inspirational Indian Neurodivergent Figures</h2>
//       <p className="subtitle">
//         These individuals have turned challenges into opportunities, proving that neurodivergence and disabilities are not barriers but strengths.
//       </p>

//       <div className="inspire-container">
//         {people.map((person, index) => (
//           <div key={index} className="person-card" onClick={() => toggleInfo(index)}>
//             <img src={person.img} alt={person.name} className="person-img" />
//             <h3 className="person-name">{person.name}</h3>
//             {activeIndex === index && <p className="person-desc">{person.desc}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Inspire;


import React, { useState } from "react";
import "../styles.css";

// Import images correctly
import AbhishekBachchan from "./Abhishek_Bachchan.jpeg";
import AliaBhatt from "./Alia_Bhatt.jpeg";
import FahadhFaasil from "./Fahadh_Faasil.jpeg";
import SabyasachiGorai from "./Sabyasachi_Gorai.jpeg";
import PranavBakhshi from "./Pranav_Bakhshi.jpeg";
import TempleGrandin from "./Temple_Grandin.jpeg";


const Inspire = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const people = [
    {
      name: "Abhishek Bachchan",
      img: AbhishekBachchan,
      desc: "Diagnosed with dyslexia at the age of nine, Abhishek struggled with reading and writing during school. Despite these challenges, he pursued a career in acting and became a celebrated Bollywood star. Today, he speaks about learning disabilities, helping raise awareness about dyslexia in India.",
    },
    {
      name: "Alia Bhatt",
      img: AliaBhatt,
      desc: "Alia Bhatt has publicly shared her struggles with ADHD, a condition that made it difficult for her to focus in school. Despite this, she developed a successful acting career, proving that neurodivergence is not a limitation but a unique way of thinking and processing the world.",
    },
    {
      name: "Fahadh Faasil",
      img: FahadhFaasil,
      desc: "Award-winning Indian actor Fahadh Faasil was diagnosed with ADHD at 41. He has spoken about the challenges of undiagnosed neurodivergence in adulthood and how understanding his condition has helped him in his creative and personal life.",
    },
    {
      name: "Sabyasachi Gorai",
      img: SabyasachiGorai,
      desc: "Celebrity chef Sabyasachi Gorai overcame dyslexia by relying on his strong visual and sensory memory. His learning style allowed him to master cooking in a unique way, making him one of India's most successful chefs today.",
    },
    {
      name: "Pranav Bakhshi",
      img: PranavBakhshi,
      desc: "India’s first model with autism, Pranav Bakhshi has broken stereotypes in the fashion industry. He has worked with major brands and advocates for autism acceptance, proving that neurodivergent individuals can thrive in unconventional fields.",
    },
    {
      name: "Temple Grandin",
      img: TempleGrandin,
      desc: "Temple Grandin, an animal behaviorist and autism advocate, transformed livestock handling with her humane designs. Diagnosed with autism, her 'thinking in pictures' unlocked unique insights into animal behavior. A celebrated author, scientist, and inspiration, her life emphasizes the strength of neurodiversity. Her story even inspired the Emmy-winning film 'Temple Grandin'.",
    },
  ];

  const toggleInfo = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="inspire-section">
      <h2 className="title">Inspirational Indian Neurodivergent Figures</h2>
      <p className="subtitle">
        These individuals have turned challenges into opportunities, proving that neurodivergence and disabilities are not barriers but strengths.
      </p>

      <div className="inspire-container">
        {people.map((person, index) => (
          <div key={index} className="person-card" onClick={() => toggleInfo(index)}>
            <img src={person.img} alt={person.name} className="person-img" />
            <h3 className="person-name">{person.name}</h3>
            {activeIndex === index && <p className="person-desc">{person.desc}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inspire;
