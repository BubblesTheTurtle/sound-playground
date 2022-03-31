import { useState, useEffect } from 'react';
import { Oscillator } from 'tone'
import { Slider, Input, Grid, InputAdornment, Button, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core'
import { FunctionPlot } from './FunctionPlot'
 

import styles from '../../styles/Inverses.module.css'


export default function Inverses() {
    const [amplitude, setAmplitude] = useState(1);
    const [frequency, setFrequency] = useState(440);
    const [play, setPlay] = useState(false);
    const [ocs, setOcs] = useState(null);
    const [inverse, setInverse] = useState(false);
    const [original, setOriginal] = useState(true);
    
    
    const handleBlur = () => {
        if (frequency < 0) {
          setFrequency(10);
        } else if (frequency > (10 ** 4.5)) {
          setFrequency(10 ** 4.5);
        }
    };

    useEffect(() => {
        const newOsc = new Oscillator(frequency, "sine").toDestination();
        setOcs(newOsc);
    }, []); 

    useEffect(() => {
        if (ocs) {
            if (play && ( original || inverse) && !(inverse && original)) {
                ocs.start()
            }
            else {
                ocs.stop()
            }
        }
    }, [play]);

    useEffect(() => {
        if (ocs) {
            ocs.frequency.value = frequency;
        }
    }, [frequency])

    useEffect(() => {
        if (ocs) {
            ocs.volume.value = 20*Math.log(amplitude)/Math.log(2);
        }
    }, [amplitude])

    const handlePlay = (e) => {
        setPlay(!play);
    }

    const graphProps = () => {
        const functions = [];

        if (original) {
            functions.push({fn: `${amplitude} * sin(${frequency}*2*PI*x)`, color: 'blue'})
        }
        if (inverse) {
            functions.push({fn: `-${amplitude} * sin(${frequency}*2*PI*x)`, color: 'red'})
        }
        else {
            functions.push({fn: `-${amplitude} * sin(${frequency}*2*PI*x)`, color: 'white'})
        }
        if (original && inverse) {
            functions.push({fn: '0', color: 'green'});
        }
        return functions;
    }


    return (<div className={styles.card}>
        <h1>Inverses</h1>
        <p>All waves have inverses and thus all sounds have inverses. This is how active noise canceling headphones and earbuds work.</p>
        <FunctionPlot
            force={original}
            other={inverse}
            options={{xAxis: {domain: [0, 4 / frequency]}, 
                yAxis: {domain: [-2, 2]},
                data: [{fn: `${original ? 1 : 0}*${amplitude} * sin(${frequency}*2*PI*x)`, color: 'blue'},
                {fn: `${inverse ? 1 : 0}*-${amplitude} * sin(${frequency}*2*PI*x)`, color: 'red'},
                {fn: `${original ? 1 : 0}*${amplitude} * sin(${frequency}*2*PI*x) + ${inverse ? 1 : 0}*-${amplitude} * sin(${frequency}*2*PI*x)`, color: 'green', graphType: 'scatter'}
            ]}}
        />
        <Grid container spacing={2}>
            <Grid item>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={original} onChange={e => {setOriginal(!original)}} />} label="Typical" />
                    <FormControlLabel control={<Checkbox checked={inverse} onChange={e => {setInverse(!inverse)}} />} label="Inverse" />
                </FormGroup>
            </Grid>
        </Grid>
        <Grid className={styles.inputPair} container spacing={2}>
            <Grid item>
            </Grid>
            <Grid item xs>
                <Input                   
                    value={Math.round(frequency)}
                    onChange={event => setFrequency(event.target.value === '' ? '' : Number(event.target.value))}
                    onBlur={handleBlur}
                    inputProps={{
                    step: 0.001,
                    min: 10,
                    max: 10 ** 4.5,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                    endAdornment={<InputAdornment position="end">Hz</InputAdornment>}
                /> 
            </Grid>
            <Grid item className={styles.slider}>
            <Slider
                value={Math.log(frequency)/Math.log(10)}
                onChange={(e, newVal) => {setFrequency(10 ** newVal)}}
                min={1}
                max={4.5}
                step={0.0001}
                scale={(x) => x ** 10}
            />
            </Grid>
        </Grid>
        <Grid className={styles.inputPair} container spacing={2}>
            <Grid item>
                Amplitude: 
            </Grid>
            <Grid item xs>
                <Input
                    value={amplitude}
                    onChange={event => setAmplitude(event.target.value === '' ? '' : Number(event.target.value))}
                    onBlur={() => {
                        if (amplitude < 0)  {
                            setAmplitude(0);
                        }
                        else if (amplitude > 1) {
                            setAmplitude(1);
                        }
                    }}
                    inputProps={{
                    step: 0.0001,
                    min: 0,
                    max: 1,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                /> 
            </Grid>
            <Grid item className={styles.slider}>
                <Slider min={0} max={1} step={0.0001} value={amplitude} onChange={(e, newVal) => {setAmplitude(newVal)}} />
            </Grid>
            
        </Grid>
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handlePlay}>
                {!play ? "Play" : "Stop"}
        </Button>

    </div>)
}
