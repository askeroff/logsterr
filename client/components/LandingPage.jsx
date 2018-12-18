import React, { Component } from 'react';

class LandingPage extends Component {
  state = {
    test: ''
  };
  render() {
    return (
      <div className="landing-content">
        <div className="landing-block white landing-block--main">
          <div className="content-wrapper">
            <h2 className="page-title">What is this?</h2>
            <div className="highlight orange" />
            <p className="landing-paragraph">
              <strong>Logsterr</strong> is an app, I have built to keep track of
              certain projects I am working on. In another words, it is a side
              project of mine. More details below.
            </p>
          </div>
        </div>
        <div className="landing-block">
          <div className="content-wrapper">
            <h2 className="page-title">What does this app do?</h2>
            <div className="highlight" />
            <div className="landing-paragraph">
              <p>
                You can create projects (and projects within those projects),
                create tasks inside those projects and whenever you are doing
                them you can press start and log how many minutes/hours you have
                spent on it. You also can mark projects and tasks as complete,
                and view the history of your timelogs.
              </p>
              <p>
                There is a popular pomodoro technique for productivity. But what
                I have found it keeps you in certain boundaries of specified
                time, like 25 minutes, when maybe you would&apos;ve done more.
                Or you don&apos;t start all, because you don&apos;t feel like
                it. While here, you press the timer and do the job as long as
                you can go.
              </p>
              <p>
                Sometimes it will be 10 minutes, sometimes 2 hours. The added
                benefit of this app, is not only you can do this, but the app
                will keep track of all the logs you did and give you some stats
                on how much you have spent on each project.
              </p>
              <p>
                I, personally, started this app as a way to keep track of my
                guitar practice. There were a lot of small tasks I had to 5-10
                minutes long and at the end I wanted to know how much I spent on
                it.
              </p>
            </div>
          </div>
        </div>

        <div className="landing-block myred">
          <div className="content-wrapper">
            <h2 className="page-title">Can I sign up?</h2>
            <div className="highlight secondblue" />
            <div className="landing-paragraph">
              <p>
                Sort of. The app is not fully ready yet. I am the only user
                right now and there is still work to do. Even though I started
                this with the idea of a simple app, it kind of spiraled and I
                keep thinking new things to do and features to add.
              </p>
              <p>
                With that said, I haven&apos;t opened the sign up yet, it&apos;s
                only with invites. But if you really like the idea and want to
                try it out, you can either{' '}
                <a href="mailto:askerovlab@gmail.com">email</a> me or{' '}
                <a href="https://twitter.com/askerovlab">tweet</a> at me, and I
                will send you the invite. And of course there is an option to
                set the app yourself. It&apos;s open source. If you have any
                questions, the same procedure: tweet or email.
              </p>
            </div>

            <h2 className="page-title">Is there mobile version?</h2>
            <div className="highlight secondblue" />
            <div className="landing-paragraph">
              <p>
                Not yet. It&apos;s primarily desktop focused browser version.
                But I&apos;m working on it. You should be able to interact with
                the app through your mobile browser but it might not be the best
                experience yet.
              </p>
            </div>
          </div>
        </div>

        <div className="landing-block white landing-block--main">
          <div className="content-wrapper">
            <h2 className="page-title">Quick Video Tour!</h2>
            <div className="highlight orange" />
            <iframe
              className="landing-video"
              title="demo"
              src="https://www.youtube.com/embed/ZNZA-a-KZak"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
