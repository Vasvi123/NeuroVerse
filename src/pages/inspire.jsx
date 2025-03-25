import React from "react";
import "../styles.css";

const Inspire = () => {
  const people = [
    {
      name: "Stephen Hawking",
      img: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg",
      desc: "A world-renowned physicist who made groundbreaking discoveries despite ALS. He redefined the way we understand black holes and the universe while relying on a speech-generating device for communication.",
    },
    {
      name: "Temple Grandin",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/TempleGrandin.jpg",
      desc: "An autistic scientist, professor, and livestock industry expert. She overcame communication barriers and sensory challenges to become a global advocate for autism awareness.",
    },
    {
      name: "Greta Thunberg",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Greta_Thunberg_2019.jpg",
      desc: "A Swedish climate activist with Asperger’s syndrome. She describes her neurodivergence as her 'superpower' that helps her stay focused and dedicated to environmental activism.",
    },
    {
      name: "Sudha Chandran",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/52/Sudha_Chandran.jpg",
      desc: "An acclaimed Indian classical dancer who lost her leg in an accident but continued her career using a prosthetic limb. She proved that disabilities cannot stop passion.",
    },
    {
      name: "Arunima Sinha",
      img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Arunima_Sinha_on_the_trek_to_Mount_Everest.jpg",
      desc: "A former national volleyball player who lost her leg in an accident but became the first female amputee to climb Mount Everest. She turned her adversity into strength.",
    },
    {
      name: "Dr. Malvika Iyer",
      img: "https://www.malvikaiyer.com/assets/img/malvika-iyer-profile.jpg",
      desc: "Survived a bomb blast that left her with amputated hands. Despite this, she pursued higher education and became a globally recognized disability rights activist and speaker.",
    },
    {
      name: "Deepa Malik",
      img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Deepa_Malik_Arjuna_Award_2012.jpg",
      desc: "Paralyzed from the waist down due to a spinal tumor, she became India's first female Paralympic medalist, proving that determination can break all barriers.",
    },
    {
      name: "Anand Arnold",
      img: "https://www.femina.in/thumb/97420393/97420393.jpg",
      desc: "Diagnosed with cancer at 15 and left paralyzed, but went on to become India’s first wheelchair bodybuilder. He is an inspiration for strength and resilience.",
    },
    {
      name: "Satoshi Tajiri",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Satoshi_Tajiri_%28cropped%29.jpg",
      desc: "The creator of Pokémon, who has autism. His deep focus on collecting insects as a child led to the development of one of the most successful game franchises ever.",
    },
    {
      name: "Chris Nikic",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Chris_Nikic.jpg",
      desc: "The first person with Down syndrome to complete an Ironman Triathlon, proving that determination knows no limits.",
    },
    {
      name: "Rajalakshmi S.J.",
      img: "https://www.nipmanfoundation.com/assets/img/rajalakshmi.jpg",
      desc: "An Indian neurodivergent innovator who developed AI-based assistive technologies for individuals with disabilities, despite facing learning difficulties herself.",
    },
    {
      name: "Daryl Hannah",
      img: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Daryl_Hannah.jpg",
      desc: "A Hollywood actress with autism, who overcame social challenges to become a successful actress and environmental activist.",
    },
  ];

  return (
    <div>
      <h2>Inspirational Neurodivergent & Disabled Figures</h2>
      <p className="description">
        Many individuals with disabilities and neurodivergent traits have overcome challenges, shattered stereotypes, and achieved greatness in various fields. Their stories inspire resilience, innovation, and determination.
      </p>
      <div className="inspire-container">
        {people.map((person, index) => (
          <div key={index} className="person">
            <img src={person.img} alt={person.name} />
            <div className="person-info">
              <h3>{person.name}</h3>
              <p>{person.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inspire;
