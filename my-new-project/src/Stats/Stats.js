import React from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'
import { getUserId } from '../lib/auth'
import StatsModal from './StatsModal'

class Stats extends React.Component{
  state ={

    dateOptions: {
      colors: ['#b38282'],
      chart: { id: 'basic-line' },
      xaxis: { categories: [] }
    },
    dateSeries: [
      {
        name: '',
        data: []
      }
    ],
    feedbackOptions: {
      colors: ['#b38282'],
      chart: { id: 'basic-bar' },
      xaxis: { categories: [] }
      
    },
    feedbackSeries: [
      {
        name: '',
        data: []
      }
    ],
    
    feedback: [],
    weakness: '',
    advice: '',
    modal: false
  }


  async componentDidMount(){
    const dateCategories = []
    const dateData = []
    const feedbackCategories = []
    const feedbackData = []

    const res = await axios.get(`/api/ratings/stats/${getUserId()}/`)

    res.data.date.map(item  => {
      dateCategories.push(item.created_at)
      dateData.push(item.rating_count)
      return ''
    })

    res.data.feedback.map(item => {
      feedbackCategories.push(item.feedback)
      feedbackData.push(item.rating_count)
      return ''
    })

    const feedbackOptions = { ...this.state.feedbackOptions, xaxis: { categories: feedbackCategories } }
    const feedbackSeries = [ { ...this.state.feedbackSeries, data: feedbackData  } ]
    const dateOptions = { ...this.state.dateOptions, xaxis: { categories: dateCategories } }
    const dateSeries = [ { ...this.state.series, data: dateData  } ]
    this.setState({ dateOptions, dateSeries, feedbackOptions, feedbackSeries, feedback: res.data.feedback })
    console.log(res)
  }
  

  getAdvice = () => {
    const weakness = this.state.feedback.reduce((x, y) => x.rating_count > y.rating_count ? x : y)
    let advice 
    switch (weakness.feedback) {
      case 'Impoverished Vibes':
        advice = 'https://bit.ly/3ffWg8B'
        console.log('here')
        break
      case 'Unattractive' :
        advice = 'https://bit.ly/2znjGJS'
        break
      case 'Unpleasant Smell' : 
        advice = 'https://bit.ly/37kknQK'
        break
      case 'Rude Interaction': 
        advice = 'https://bit.ly/3dWXzJe'
        break
      case 'Disciminatory': 
        advice = 'https://bit.ly/3dWXzJe'
        break
      default : advice = 'google.com'
    }
    this.setState({ weakness: weakness.feedback, advice }, 
      () => {
        this.handleModal()
      })
  }

  handleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  render() {


    return (
      <>
        <button 
          className='button advice-button'
          onClick={this.getAdvice}> Advice Slip </button>
        <h1> My Ratings Report</h1>

        <StatsModal
          advice={this.state.advice}
          weakness={this.state.weakness}
          modal={this.state.modal}
          handleModal={this.handleModal}
        />



        <div className='bordered-box dark-border stats-text'>Id exercitation officia cupidatat minim velit esse exercitation consequat ad anim veniam labore ut consectetur.Do voluptate sint aliqua eu enim reprehenderit nostrud dolore.Velit quis duis et laborum do occaecat.Sit Lorem incididunt incididunt laboris voluptate amet duis aliquip laborum.Adipisicing pariatur sint qui irure.Aute consequat dolore voluptate deserunt voluptate adipisicing proident ea.Voluptate exercitation ex sint adipisicing.Qui incididunt exercitation ex ex aliquip tempor veniam ea ad qui sunt tempor ad exercitation.Id deserunt consectetur deserunt dolore fugiat culpa non est ea minim consectetur.</div>

        <div className='stats-container flex'>
          
          <div className='graph'>
            <h2 className='bordered-box dark-border'>Number of ratings by date</h2> 
            <div className="app">
              <div className="row">
                <div className="mixed-chart">
                  <Chart
                    options={this.state.dateOptions}
                    series={this.state.dateSeries}
                    type="line"
                    width={window.innerWidth / 3.0}
  
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='graph'>
            <h2 className='bordered-box dark-border'>Number by Feedback</h2> 
            <div className="app">
              <div className="row">
                <div className="mixed-chart">
                  <Chart
                    options={this.state.feedbackOptions}
                    series={this.state.feedbackSeries}
                    type="bar"
                    width={window.innerWidth / 3.0}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className='dark-border bordered-box stats-text'>

        Id exercitation officia cupidatat minim velit esse exercitation consequat ad anim veniam labore ut consectetur.Do voluptate sint aliqua eu enim reprehenderit nostrud dolore.Velit quis duis et laborum do occaecat.Sit Lorem incididunt incididunt laboris voluptate amet duis aliquip laborum.Adipisicing pariatur sint qui irure.Aute consequat dolore voluptate deserunt voluptate adipisicing proident ea.Voluptate exercitation ex sint adipisicing.Qui incididunt exercitation ex ex aliquip tempor veniam ea ad qui sunt tempor ad exercitation.Id deserunt consectetur deserunt dolore fugiat culpa non est ea minim consectetur.
        Id exercitation officia cupidatat minim velit esse exercitation consequat ad anim veniam labore ut consectetur.Do voluptate sint aliqua eu enim reprehenderit nostrud dolore.Velit quis duis et laborum do occaecat.Sit Lorem incididunt incididunt laboris voluptate amet duis aliquip laborum.Adipisicing pariatur sint qui irure.Aute consequat dolore voluptate deserunt voluptate adipisicing proident ea.Voluptate exercitation ex sint adipisicing.Qui incididunt exercitation ex ex aliquip tempor veniam ea ad qui sunt tempor ad exercitation.Id deserunt consectetur deserunt dolore fugiat culpa non est ea minim consectetur.
        </div>
      





      </>
    )
  }
}

export default Stats