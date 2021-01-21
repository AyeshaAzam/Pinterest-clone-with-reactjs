import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Mainboard from "./Components/Mainboard";
import unsplash from "./api/unsplash";
import db from "./firebase";

// https://www.pinterest.com
// Unsplash Api : https://unsplash.com/developers
// install: npm i firebase, then npm install -g firebase-tools
// install : npm i axios
// we need to get API-Key from unsplash.com (API developer)
//Doc for Search :  https://unsplash.com/documentation#search-photos

/*
Axios
Api call
Get data from the form
Input onChange event   --- useState
Api call and render the Pins
*/

/*
Because that searchedPins - you want all of the pins in there right? But you’re dependent on the API call too 
so basically you collect them first, when all of the promises are resolved, that’s when you know you’ve got all the pins 
in your searchedPins-array. It has to do with understanding local/global scope 
and also useState as you want to use these pins throughout your whole component and not only within this function.
*/

/*
If I have Array and I use Push() what happens ?
Whenever we push something in Array then it is pushed at the back of the array
So if I search term like : mongo then cars then oceans then i will get like this:
mongo [{},{}, {}...10] cars [{},{}, {}...10] oceans[{},{}, {}...10]
*/

const API_URL = "https://api.unsplash.com/search/photos";

function App() {
  const [newPins, setNewPins] = useState([]);

  const MakeAPICALL = (term) => {
    // Make an  API call
    return unsplash.get(API_URL, {
      params: { query: term },
    });
  };

  const getNewPins = () => {
    let promises = [];
    let pinData = [];

    db.collection("terms").onSnapshot((snapshot) => {
      let snapshotData = snapshot.docs;

      console.log("e >>>> ", snapshotData);

      if (snapshotData.length >= 10) {
        //want to have 5 terms
        snapshotData = snapshotData.slice(
          snapshotData.length - 5,
          snapshotData.length
        );
      }

      snapshotData.map((doc) => {
        promises.push(
          MakeAPICALL(doc.data().term).then((res) => {
            // via doc.data().term --- we call the db data
            let results = res.data.results;
            console.log(">>>>", res);
            results.map((object) => {
              pinData.push(object);
            });

            pinData.sort(function (a, b) {
              return 0.5 - Math.random(); // it doesnot goes below Zero
            });
          })
        );
      });
      Promise.all(promises).then(() => {
        setNewPins(pinData);
      });
    });
  };

  useEffect(() => {
    getNewPins(); // want to be upon previous search term ( previous search we did)
  }, []);

  const onSearchSubmit = (term) => {
    console.log("this is from App() ", term);
    let promises = [];
    let searchedPins = [];
    console.log("what is inside searchedPins", searchedPins);
    promises.push(
      MakeAPICALL(term).then((res) => {
        let results = res.data.results;
        //console.log(">>>>>", results);
        return results.map((pin) => {
          //console.log("what is inside pin", pin);
          searchedPins.push(pin);
          //console.log("what is inside searchedPins", searchedPins);
        });
      })
    );

    Promise.all(promises).then(() => {
      setNewPins(searchedPins);
    });
    //console.log("MakeAPICALL <<< ", MakeAPICALL(term));
    //console.log("this is from App() ", term);
  };

  return (
    <div className="app">
      <div className="app__header">
        <Header onSubmit={onSearchSubmit} />
      </div>
      <div className="app__body">
        <Mainboard pins={newPins} />
      </div>
    </div>
  );
}

export default App;
