import React from 'react';

const MainPage = () => (
  <div className="flex flex-column flex-auto">
    <div className="flex-auto flex flex-column items-center bg-washed-red ">
    <h1 className="f2 f1-l fw5  mt4 mt6-l mb0 ">Uberlift</h1>
    <h2 className="f4 f3-l mt3 fw1 mb4">Now a subheadline where explain your wonderful new startup even more</h2>
    <div>
      <a className="f6 bg-red white ba b--dark-red ph3 pv2 mb3 mr2 br3 link" href="/">Read Testimonials</a>
      <a className="f6 bg-red white ba b--dark-red ph3 pv2 mb3 mr2 br3 link" href="/">About</a>
      <a className="f6 bg-red white ba b--dark-red ph3 pv2 mb3 mr2 br3 link" href="/">Why it works</a>
    </div>
    <div className="flex flex-auto  mt4 mt6-l bg-light-red w-100 justify-around">
      <div className="flex flex-column items-center mt3 ">
        <p className="fw5 f3 white">Easy to Use</p>
        <p className="near-white f4 measure-narrow">
          No additional downloading required everything just works.
        </p>
      </div>
      <div className="flex flex-column items-center mt3">
        <p className="fw5 f3 white">Thousands of Sessions</p>
        <p className=" near-white f4 measure-narrow">With just the right one for you!</p>
      </div>
      <div className="flex flex-column items-center mt3">
        <p className="fw5 f3 white">Train whenever </p>
        <p className=" near-white f4 measure-narrow">Our tech is mobile friendly so you can train wherever you like.</p>
      </div>
    </div>
    </div>
  </div>

)

export default MainPage;
