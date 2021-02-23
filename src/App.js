import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playerslist: [],
      teamslist: [],
      searchTerm:"",
      isLoaded: false,
    }
    this.editSearchTerm = this.editSearchTerm.bind(this);
  }

componentDidMount(){

  // fetch('https://api.npoint.io/d6bd0efc05639084eb17/')
  // .then(res => {
  //   console.log(res);
  
  //   this.setState({
  //     isLoaded: true,
  //     items: json,
  //   })
  // });

  axios.get('https://api.npoint.io/d6bd0efc05639084eb17/')
  .then( response => {
    // handle success
      console.log(response.data);
    this.setState({
           isLoaded: true,
          playerslist: response.data.playerList,
          teamslist : response.data.teamsList
         })

  });
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
  // });

}

editSearchTerm(e){
  this.setState({searchTerm : e.target.value})
}

  render(){
      const { isLoaded,playerslist , teamslist, searchTerm } = this.state;
      playerslist.sort((a,b) => (parseFloat(a.Value) > parseFloat(b.Value)) ? 1 : ((parseFloat(b.Value) > parseFloat(a.Value)) ? -1 : 0))
      console.log(this.state);
      const playersData=  playerslist.filter((p) => p.PFName.toLowerCase().includes(searchTerm.toLowerCase()) || p.TName.toLowerCase().includes(searchTerm.toLowerCase()));
      const imageFolder = "./images/"
        return (
          <div className="App"> 
            <input type='text' value ={this.state.searchTerm} onChange={this.editSearchTerm} placeholder='Search for player!' />
             <div className="players">
                 {playersData.map(item => {
                   let img = item.Id + ".jpg";
                   const image = imageFolder+img;
                   return (
                   <div className="player" style={{ padding:'10px'}}>
                     <div className="player-img">
                     <img src={image} style={{ width:'100px'}}/>
                     </div>
                     <div className="playerDetails">
                       <div className="name">{item.PDName}</div>
                       <div className="name">{item.PFName}</div>
                       <div className="name">{item.SkillDesc}</div>
                       <div className="name">{"$" + item.Value }</div>
                       <div className="name">{item.UpComingMatchesList.map(list =>{
                        let matchDate = new Date(list.MDate + ' UTC');
                      return(
                        <div>
                      <div>
                          { list.CCode + " vs " + list.VsCode } </div>
                          <div>
                          { matchDate.toDateString() }
                         </div>
                      </div>
                      )
                    })}</div>
                    </div>
                 </div>)
               })}
             </div>
          </div>
        );
  }  
}

export default App;
