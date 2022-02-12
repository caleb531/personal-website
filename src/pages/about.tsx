import React from 'react';

function About() {
  return (
    <div className="page-about">

      <h3>Who are you?</h3>

      <p>I'm Caleb Evans, a web developer with many passions: programming, spending time with family and friends, watching (and quoting) movies, trampolining, and eating quality pizza. I currently reside in Carlsbad, California, having just finished my Bachelor's in Computer Science at CSU San Marcos.</p>

      <h3>What do you do?</h3>

      <p>Since 2010, I've been programming for school and for fun. My most prominent work includes a plethora of web apps and useful tools, many of which were created to automate what I grew tired of doing manually. Others I created simply for fun.</p>

      <h3>Why do you code?</h3>

      <p>Besides the fact that I greatly enjoy coding, I make it my aim to code for Christ, who has always walked with me as my Lord, my Friend, and my Savior. I code because I believe the work of my hands glorifies God through the creativity I express, and ultimately, through the lives enriched by my projects.</p>

      <h3>How many languages do you speak?</h3>

      <p>I am fluent in over six million forms of... ha, just kidding. I am fluent in HTML5, CSS3, JavaScript, and PHP, since most of my projects are web-based. I'm also well-versed in Python, and I fiddle with Bash regularly in an effort to improve my developer workflow.</p>

      <h3>What is your favorite language?</h3>

      <p>If I could choose only one, my favorite language would definitely be TypeScript because of how many bugs it saves me from every time I write it. Plus, I thoroughly enjoy working with the ES6 language features like promises, destructuring, and arrow functions.</p>

      <h3>What is your code editor of choice?</h3>

      <p>For years, I used <a href="https://atom.io/">Atom</a>, but nowadays, I use <a href="https://code.visualstudio.com/">VS Code</a> for its powerful feature set, excellent TypeScript support, and better performance on M1 Macs. You can view my configuration for both editors at my public <a href="https://github.com/caleb531/dotfiles">dotfiles</a> repository.</p>

      <h3>Tabs or spaces?</h3>

      <p>That depends. In VS Code (with the "Sticky Tab Stops" setting enabled), spaces behave the same as tabs when used as indentation, so I generally conform to the convention of whichever language I'm writing in.</p>

      <h3>What's the story behind your project icons?</h3>

      <p>I actually made them myself; each icon is written in pure SVG markup.</p>

    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: 'About',
      description: 'About the life and interests of Caleb Evans, coder for Christ'
    }
  };
}

export default About;
