<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>



<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/deniramadani/LawenconCommunity-FE">
    <img src="assets/images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Lawencon Community - FrontEnd</h3>

  <p align="center">
    Social Media + Market place at Lawencon Community
    <br />
    <a href="https://github.com/deniramadani/LawenconCommunity-FE"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/deniramadani/LawenconCommunity-FE">View Demo</a>
    ·
    <a href="https://github.com/deniramadani/LawenconCommunity-FE/issues">Report Bug</a>
    ·
    <a href="https://github.com/deniramadani/LawenconCommunity-FE/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

The following is a brief description of the problem and system flow
* Requirements :
  ```sh
  1. User roles consist of Super Admin, Admin and Member
  2. Super Admin can create master data
  3. Member profiles include full name, email, company, industry and position
  4. There is a verification code feature that is sent to an email when a member registers
  5. Members can also bookmark, like and comment on posts
  6. Forms of posts, among others
    a. Normal Post (title, content and image)
    b. Poll Post (title, content and poll)
    c. Premium posts that are partially visible and when you want to see all of them must first subscribe to the application
  7. Admin can create articles (images, titles and content)
  8. Members can create events and courses (images, titles, providers, locations, schedules, prices and times) with a fee sharing system
  9. To be able to join the event/course, members must make a payment and upload proof of transfer to the application (admin checks and approves)
  ```
* Create reports for:
  ```sh
  1. Displays information reports on members who have participated in events or courses for a certain period (event/course start date).
    a. Member = (No, Type, Title, Start Date, Total Participants)
    b. Super Admin = (No, Member Name, Provider Name, Type, Title, Start Date, Total Participants)
  2. Displays income information reports from events or courses for a certain period (date of approval of proof of payment).
    a. Member = (No, Type, Title, Total Income)
    b. Super Admin = (No, Member Name, Type, Total Income)
  ```
* Technology used:
  ```sh
  1. Java
  2. Spring Boot
  3. Hibernate
  4. Json Web Token (JWT)
  5. Angular
  6. PostgreSQL
  7. Jasper Reports
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Angular][Angular.io]][Angular-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Community
  ```sh
  This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.
  ```
* Development server
  ```sh
  Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
  ```
* Code scaffolding
  ```sh
  Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
  ```
* Build
  ```sh
  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
  ```
* Running unit tests
  ```sh
  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
  ```
* Running end-to-end tests
  ```sh
  Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
  ```
* Further help
  ```sh
  To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
  ```

### Installation

1. Clone the repo
  ```sh
  git clone https://github.com/deniramadani/LawenconCommunity-FE.git
  ```
2. Execute this syntax on root project to run it
  ```sh
  ng serve mainarea
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Still working useful examples of how this project can be used. Additional screenshots, code examples and demos will be provided in this space. 

_Please refer here for the [Documentation](https://github.com/deniramadani/LawenconCommunity-FE/tree/master/assets/documentation)_<br>
_Please refer here for the [Figma Preview](https://www.figma.com/file/brKZTNmYbeBvQWEhU9K1Gi/Community?node-id=0%3A1&t=z4o2BpwfWKIQemM3-1)_<br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Design Layout
- [x] Connect with backend
- [x] Master
- [x] Transaction

See the [open issues](https://github.com/deniramadani/LawenconCommunity-FE/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GPL-3.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Deni Ramdani - [@twitter_handle](https://twitter.com/twitter_handle) - deni.ramadani05@gmail.com<br>
Fransisko Sihombing - [@twitter_handle](https://twitter.com/twitter_handle) - fransiskosihombing@gmail.com<br>
Maulana Rezi Rosadi - [@twitter_handle](https://twitter.com/rezimaulana) - rsazrm@gmail.com<br>

Project Link: [https://github.com/deniramadani/LawenconCommunity-FE](https://github.com/deniramadani/LawenconCommunity-FE)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

I've included a few of resources that i find helpful:

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/deniramadani/LawenconCommunity-FE.svg?style=for-the-badge
[contributors-url]: https://github.com/deniramadani/LawenconCommunity-FE/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/deniramadani/LawenconCommunity-FE.svg?style=for-the-badge
[forks-url]: https://github.com/deniramadani/LawenconCommunity-FE/network/members
[stars-shield]: https://img.shields.io/github/stars/deniramadani/LawenconCommunity-FE.svg?style=for-the-badge
[stars-url]: https://github.com/deniramadani/LawenconCommunity-FE/stargazers
[issues-shield]: https://img.shields.io/github/issues/deniramadani/LawenconCommunity-FE.svg?style=for-the-badge
[issues-url]: https://github.com/deniramadani/LawenconCommunity-FE/issues
[license-shield]: https://img.shields.io/github/license/deniramadani/LawenconCommunity-FE.svg?style=for-the-badge
[license-url]: https://github.com/deniramadani/LawenconCommunity-FE/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: assets/images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Spring.io]: https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-url]: https://spring.io/