import React, { useState, useEffect } from 'react';
import './App.css';
import { debugData } from '../utils/debugData';
import { useNuiEvent } from '../hooks/useNuiEvent';
import SpawnInfo from './modules/SpawnInfo';
import MapComponent from './modules/MapComponent';
import LocationPins from './modules/LocationPins';
import SpawnDecision from './modules/SpawnDecision';
import LastLocationButton from './modules/LastLocationButton';
import InformationPanel from './modules/InformationPanel';

debugData([{ action: 'setVisible', data: true }]);

interface LocationsInterface {
  top: number;
  left: number;
  label: string;
}

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showHidden, setShowHidden] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(true);
  const [visible, setVisible] = useState(false);
  const [chosenData, setChosenData] = useState({ label: '', x: 0, y: 0, z: 0 });
  const [infoData, setInfoData] = useState({
    time: '10:00 AM',
    date: 'Saturday, May 14',
    weather: 'Xmas',
    temp: '27',
    wind: '1',
  });
  const [locations, setLocations] = useState<LocationsInterface[]>([
    { top: 62.03, left: 56.51, label: 'Pier' },
    { top: 56.66, left: 47.91, label: 'Richman Hotel' },
    { top: 24.07, left: 27.60, label: 'Sandy Shores' },
    { top: 45.37, left: 11.97, label: 'Paleto Bay' },
    { top: 31.48, left: 53.12, label: 'Mirror Park' },
  ]);

  useNuiEvent('setVisible', (data) => setShow(data));
  useNuiEvent('setLocations', (data) => setLocations(data));
  useNuiEvent('infoPanel', (data) => setInfoData(data));
  const lastLocation = () => {
    setChosenData({ label: 'Last Location', x: 0, y: 0, z: 0 });
    setVisible(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setHidden(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHidden(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`nui-wrapper ${show}`} style={{ visibility: showHidden ? 'hidden' : 'visible' }}>
      <SpawnInfo text="CHOOSE WHERE TO APPEAR" />
      <SpawnInfo text="SPAWN SELECT" />
      <InformationPanel {...infoData} />
      <MapComponent />
      <LocationPins locations={locations} setVisible={setVisible} />
      <SpawnDecision
        visible={visible}
        chosenData={chosenData}
        setVisible={setVisible}
        setChosenData={setChosenData}
      />
      <LastLocationButton onClick={lastLocation} />
    </div>
  );
};

export default App;