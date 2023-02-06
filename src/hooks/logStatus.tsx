

var logStatus=false;

export function setLogStatus(props) {
    logStatus=props;
    console.log("INSIDE HOOK: "+logStatus);

  }

export function getLogStatus(){
    return logStatus;
    console.log(logStatus);
}