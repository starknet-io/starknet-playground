#!/bin/bash
while [[ $# -gt 0 ]]; do
    case "$1" in
        --starknet-mode)
            export REACT_APP_MODE=starknet
            shift
            ;;
        *)
            echo "Invalid argument: $1"
            exit 1
    esac
    shift
done

react-scripts build

