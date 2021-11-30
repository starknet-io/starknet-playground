#!/bin/bash
while [[ $# -gt 0 ]]; do
    case "$1" in
         --starknet-mode)
           export REACT_APP_MODE=starknet
           shift
           ;;
        --use-real-sharp)
            export $(grep REACT_APP_SHARP_SERVICE_URL .env.production | xargs)
            shift
            ;;
        --use-starknet-alpha)
            export  $(grep REACT_APP_STARKNET_ALPHA_SERVICE_URL .env.production | xargs)
            shift
            ;;
        *)
            echo "Invalid argument: $1"
            exit 1
    esac
    shift
done

react-scripts start

