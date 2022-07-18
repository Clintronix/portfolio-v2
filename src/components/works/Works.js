/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";

import sanityClient from '../../Client.js'

import './Works.css';
import { RoundedCorner } from "@material-ui/icons";

// Import ../../assets/recentprojects/
// import Portfolio from '../../assets/recentprojects/react-portfolio.png';
// import Veritru from '../../assets/recentprojects/veritru.png';
// import Lofo from '../../assets/recentprojects/lofo.png';
// import Startup from '../../assets/recentprojects/startup.png';
// import Lacalle from '../../assets/recentprojects/lacalle.png';
// import firstReact from '../../assets/recentprojects/first-react.png';


const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "auto",
  },
}));


export const Works = () => {

  const [projectData, setProject] = useState(null);

        useEffect(() => {
            sanityClient
                .fetch(`*[_type == "project"] | order(_createdAt desc){
                    title,
                    date,
                    mainImage{
                      asset->{
                          _id,
                          url
                      },
                      alt
                    },
                    place,
                    description,
                    projectType,
                    link,
                    tags
                }`
            )
            .then((data) => setProject(data))
            .catch(console.error)
        }, []);

  const classes = useStyles();
  // const [projects, setProjects] = useState([
  //   { 
  //     id: 1,
  //     title: 'React Portfolio', 
  //     description: `Designed and developed a ReactJS portfolio 
  //     with fancy 3D animations using Three.js for 
  //     the background element.`,
  //     alter: 'React Portfolio',
  //     image: `${firstReact}`,
  //   },
  //   { 
  //     id: 2,
  //     title: 'VeriTru Project', 
  //     description: `An advocacy project website built using
  //     MEAN stack with fact-checking tool to promote actions against
  //     fake news.`,
  //     alter: 'VeriTru Project',
  //     image: `${Veritru}`,
  //   },
  //   { 
  //     id: 3,
  //     title: 'LoFo Project', 
  //     description: `Logistics and Forwarding website built using
  //     ReactJS to design and develop its front-end.`,
  //     alter: 'LoFo Project',
  //     image: `${Lofo}`,
  //   },
  //   { 
  //     id: 4,
  //     title: 'Startup Project', 
  //     description: `A website portfolio project for the Startup Dev Team
  //     built using MEVN stack to demonstrate the CRUD capabilities of the tech stack.`,
  //     alter: 'Startup Project',
  //     image: `${Startup}`,
  //   },
  //   { 
  //     id: 5,
  //     title: 'LaCalle Cafe', 
  //     description: `A website project for the La Calle Cafe business
  //     built using Wordpress and PHP with integrated SEO tools to help
  //     the business ramp up its prospects and lead generation.`,
  //     alter: 'Startup Project',
  //     image: `${Lacalle}`,
  //   },
  // ]);

  return (
    <section id="works">
      <Container component="main" className={classes.main} maxWidth="md">
        {projectData && projectData.map((project, index) => (
          
          <div className="project" key={ index }>
            <div className="__img_wrapper" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <a href={project.link}>
              <img 
              src={project.mainImage.asset.url}
              alt={project.mainImage.alt}
              style={{
                width: "600px",
                borderRadius: "5%"
              }}
              />
              </a>
            </div>
            <div className="__content_wrapper">
              <h3 className="title">
                <TextDecrypt text={ index + '. ' + project.title } />
              </h3>
              <p className="description">
                { project.description }
              </p>
              <a 
                                href={project.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="text-red-500 font-bold hover:underline hover:text-red-400"
                                >View The Project{" "}
                                <span role="img" aria-label="right pointer">👉</span>
              </a>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};
