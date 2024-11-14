import {createTheme} from '@mui/material/styles';

export const stagingTheme = createTheme({
    typography: {
        "fontFamily": `"IBM Plex Sans", "Arial", sans-serif`,
        "fontSize": 15,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        mode: "light",
        primary: {
            main: '#3B82F6',  // #1976d2
            light: '#e1f5fe'  // e1f5fe
        },
        secondary: {
            main: '#EF6C00',
        },
        error: {
            main: "#d81b60",
        },
        success: {
            main: "#43a047",
        },
        gray: {
            main: "#ccc"
        },
        form: {
            group: {
                background: "white",
                header: "whitesmoke"
            }
        },
        background: {
            default: 'whitesmoke',  // whitesmoke
            paper: "white", // white
            light: "whitesmoke" // white
        },
        text: {
            primary: '#000',
            secondary: '#444',
        },
        common: {
            white: "white",
            black: "black"
        },
        wf: {
            dots: "#444",
            node: {
                background: "white",
                color: "#444444",
                border: "rgba(0,0,0, .5)",
                selectedBackground: '#3B82F6',
                selectedColor: "white",
                disabled: {borderColor: "#ccc", color: "#999", backgroundColor: "white"}
            }
        },
        charts: {
            pie: ['#3B82F6', '#00C49F', '#FFBB28', '#FF8042'],
            line: [
                "#7795FF",
                '#3B82F6',
                '#3d5afe',
                "#8bc34a",
                "#4caf50",
                "#f44336",
                "#ff9800",
                "#FFB178",
                "#FF78B1",
                "#FF3C8E",
                "#A0BBFF",
                "#EC77FF",
                "#A0F9FF",
            ]
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(235,235,235)'
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                markLabel: {
                    fontSize: '14px', // Adjust font size as needed
                },
                thumb: {
                    color:"#3B82F6",
                },
                track: {
                    color:"#3B82F6",
                    borderColor: "#3B82F6", // Example border color for the track
                    borderWidth: 0,
                    borderStyle: 'solid',
                    boxShadow: `0 0 0 2px #3B82F6`, // Simulating border with shadow
                },
                rail: {
                    color: 'rgba(128,128,128,.3)', // Example border color for the rail
                    // borderWidth: '2px',
                    // borderStyle: 'solid',
                    // boxShadow: `0 0 0 2px red`, // Simulating border with shadow
                },
                // Targeting the marks
                mark: {
                    backgroundColor: '#3B82F6', // Example color for the marks
                    width: '4px',
                    height: '4px',
                    '&.MuiSlider-markActive': {
                        backgroundColor: '#eee', // Example color for active marks
                    },
                },
            },
        },
    }
});

export const darkTheme = createTheme({
    typography: {
        "fontFamily": `"IBM Plex Sans", "Arial", sans-serif`,
        "fontSize": 15,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        mode: "dark",
        primary: {
            main: '#805fcf',  // #1976d2
            light: '#666'  // e1f5fe
        },
        secondary: {
            main: '#EF6C00',
        },
        error: {
            main: "#d81b60",
        },
        success: {
            main: "#43a047",
        },
        gray: {
            main: "#444444"
        },
        background: {
            default: '#222222',  // whitesmoke
            paper: "#333333", // white
            light: "#444" // white
        },
        form: {
            group: {
                header: '#444',
                background: "#353535"
            }
        },
        text: {
            primary: '#eee',
            secondary: '#bbb',
        },
        common: {
            white: "#444",
            black: "#eee"
        },
        wf: {
            dots: "#888",
            node: {
                background: "#444",
                color: "#eee",
                border: "#eee",
                selectedBackground: "#805fcf",
                selectedColor: "white",
                disabled: {borderColor: "#555", color: "#666", backgroundColor: "#444"}
            }
        },
        charts: {
            pie: ['#805fcf', '#00C49F', '#FFBB28', '#FF8042'],
            line: [
                "#805fcf",
                '#3B82F6',
                '#3d5afe',
                "#8bc34a",
                "#4caf50",
                "#f44336",
                "#ff9800",
                "#FFB178",
                "#FF78B1",
                "#FF3C8E",
                "#A0BBFF",
                "#EC77FF",
                "#A0F9FF",
            ]
        }
    },
    components: {
        MuiSlider: {
            styleOverrides: {
                markLabel: {
                    fontSize: '14px', // Adjust font size as needed
                },
                thumb: {
                    color:"#805fcf",
                },
                track: {
                    color:"#805fcf",
                    borderColor: "#805fcf", // Example border color for the track
                    borderWidth: 0,
                    borderStyle: 'solid',
                    boxShadow: `0 0 0 2px #805fcf`, // Simulating border with shadow
                },
                rail: {
                    color: 'rgba(128,128,128,.3)', // Example border color for the rail
                    // borderWidth: '2px',
                    // borderStyle: 'solid',
                    // boxShadow: `0 0 0 2px red`, // Simulating border with shadow
                },
                // Targeting the marks
                mark: {
                    backgroundColor: '#805fcf', // Example color for the marks
                    width: '4px',
                    height: '4px',
                    '&.MuiSlider-markActive': {
                        backgroundColor: '#eee', // Example color for active marks
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    backgroundColor: "rgba(30,30,30)"
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(10,10,10, .5)",
                    backdropFilter: "blur(20px)"
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    color: 'lightgray',
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: 'white',
                    },
                    '&.Mui-disabled': {
                        color: 'lightgray',
                    },
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rbga(200,200,200,.2)',
                    borderColor: "#f5f5f5",
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(200,200,200,.3)',
                        borderColor: "white",
                    },
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    // Your custom styles for adornments
                    color: 'lightgrey',
                    // Other styles as needed
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    // Styles for disabled labels
                    color: 'lightgrey', // Example color
                    '&.Mui-focused': {
                        color: 'lightgrey',
                    }
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    // This targets the input part of the OutlinedInput
                    '&.Mui-disabled': {
                        // Styles when the OutlinedInput is disabled
                        color: 'lightgrey', // Example: change text color
                        "-webkit-text-fill-color": "lightgrey",
                        '& .MuiInputAdornment-root': {
                            color: 'lightgrey',

                        },
                        "& .MuiInputLabel-root": {
                            color: 'lightgrey',
                        }
                    }
                },
                root: {
                    '&.Mui-disabled': {
                        color: 'lightgrey',
                        '& .MuiInputAdornment-root': {
                            color: 'lightgrey',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            color: 'lightgrey',
                            borderColor: 'lightgrey',
                        },
                    },
                    '&.MuiInputAdornment-root': {
                        color: 'lightgrey',
                    },
                    // Target the root style
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Change border color when focused
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Change border color on hover
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#999', // Default border color
                    },
                    '&.MuiInputLabel-outlined': {
                        color: 'lightgrey',
                        '& .MuiInputAdornment-root': {
                            color: 'lightgrey',
                        },
                    }
                }
            },
        },
    },
});

export const productionDarkTheme = createTheme({
    typography: {
        "fontFamily": `"IBM Plex Sans", "Arial", sans-serif`,
        "fontSize": 15,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        mode: "dark",
        primary: {
            main: '#9234D5',  // #1976d2
            light: '#666'  // e1f5fe
        },
        secondary: {
            main: '#EF6C00',
        },
        error: {
            main: "#d81b60",
        },
        success: {
            main: "#43a047",
        },
        gray: {
            main: "#444444"
        },
        background: {
            default: '#222222',  // whitesmoke
            paper: "#333333", // white
            light: "#444" // white
        },
        form: {
            group: {
                header: '#444',
                background: "#353535"
            }
        },
        text: {
            primary: '#eee',
            secondary: '#bbb',
        },
        common: {
            white: "#444",
            black: "#eee"
        },
        wf: {
            dots: "#888",
            node: {
                background: "#444",
                color: "#eee",
                border: "#eee",
                selectedBackground: "#9234D5",
                selectedColor: "white",
                disabled: {borderColor: "#555", color: "#666", backgroundColor: "#444"}
            }
        },
        charts: {
            pie: ['#805fcf', '#00C49F', '#FFBB28', '#FF8042'],
            line: [
                "#805fcf",
                '#3B82F6',
                '#3d5afe',
                "#8bc34a",
                "#4caf50",
                "#f44336",
                "#ff9800",
                "#FFB178",
                "#FF78B1",
                "#FF3C8E",
                "#A0BBFF",
                "#EC77FF",
                "#A0F9FF",
            ]
        }
    },
    components: {
        MuiSlider: {
            styleOverrides: {
                markLabel: {
                    fontSize: '14px', // Adjust font size as needed
                },
                thumb: {
                    color:"#9234D5",
                },
                track: {
                    color:"#9234D5",
                    borderColor: "#9234D5", // Example border color for the track
                    borderWidth: 0,
                    borderStyle: 'solid',
                    boxShadow: `0 0 0 2px #9234D5`, // Simulating border with shadow
                },
                rail: {
                    color: 'rgba(128,128,128,.3)', // Example border color for the rail
                    // borderWidth: '2px',
                    // borderStyle: 'solid',
                    // boxShadow: `0 0 0 2px red`, // Simulating border with shadow
                },
                // Targeting the marks
                mark: {
                    backgroundColor: '#9234D5', // Example color for the marks
                    width: '4px',
                    height: '4px',
                    '&.MuiSlider-markActive': {
                        backgroundColor: '#eee', // Example color for active marks
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    backgroundColor: "rgba(30,30,30)"
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(10,10,10, .5)",
                    backdropFilter: "blur(20px)"
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    color: 'lightgray',
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: 'white',
                    },
                    '&.Mui-disabled': {
                        color: 'lightgray',
                    },
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rbga(200,200,200,.2)',
                    borderColor: "#f5f5f5",
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(200,200,200,.3)',
                        borderColor: "white",
                    },
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    // Your custom styles for adornments
                    color: 'lightgrey',
                    // Other styles as needed
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    // Styles for disabled labels
                    color: 'lightgrey', // Example color
                    '&.Mui-focused': {
                        color: 'lightgrey',
                    }
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    // This targets the input part of the OutlinedInput
                    '&.Mui-disabled': {
                        // Styles when the OutlinedInput is disabled
                        color: 'lightgrey', // Example: change text color
                        "-webkit-text-fill-color": "lightgrey",
                        '& .MuiInputAdornment-root': {
                            color: 'lightgrey',

                        },
                        "& .MuiInputLabel-root": {
                            color: 'lightgrey',
                        }
                    }
                },
                root: {
                    '&.Mui-disabled': {
                        color: 'lightgrey',
                        '& .MuiInputAdornment-root': {
                            color: 'lightgrey',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            color: 'lightgrey',
                            borderColor: 'lightgrey',
                        },
                    },
                    '&.MuiInputAdornment-root': {
                        color: 'lightgrey',
                    },
                    // Target the root style
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Change border color when focused
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Change border color on hover
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#999', // Default border color
                    },
                    '&.MuiInputLabel-outlined': {
                        color: 'lightgrey',
                        '& .MuiInputAdornment-root': {
                            color: 'lightgrey',
                        },
                    }
                }
            },
        },
    },
});

export const productionTheme = createTheme({
    typography: {
        "fontFamily": `"IBM Plex Sans", "Arial", sans-serif`,
        "fontSize": 15,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        mode: "light",
        primary: {
            main: '#3700b3',  // #1976d2
            light: '#f3e5f5'  // e1f5fe
        },
        secondary: {
            main: '#EF6C00',
        },
        error: {
            main: "#d81b60",
        },
        success: {
            main: "#43a047",
        },
        gray: {
            main: "#ccc"
        },
        form: {
            group: {
                header: "whitesmoke",
                background: "white"
            }
        },
        background: {
            default: 'whitesmoke',  // whitesmoke
            paper: "white", // white
            light: "whitesmoke" // white
        },
        text: {
            primary: '#000',
            secondary: '#444',
        },
        common: {
            white: "white",
            black: "black"
        },
        wf: {
            dots: "#444",
            node: {
                background: "white",
                color: "#444444",
                border: "rgba(0,0,0, .5)",
                selectedBackground: '#3700b3',
                selectedColor: "white",
                disabled: {borderColor: "#ccc", color: "#999", backgroundColor: "white"}
            }
        },
        charts: {
            pie: ['#3B82F6', '#00C49F', '#FFBB28', '#FF8042'],
            line: [
                "#7795FF",
                '#3B82F6',
                '#3d5afe',
                "#8bc34a",
                "#4caf50",
                "#f44336",
                "#ff9800",
                "#FFB178",
                "#FF78B1",
                "#FF3C8E",
                "#A0BBFF",
                "#EC77FF",
                "#A0F9FF",
            ]
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(235,235,235)'
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                markLabel: {
                    fontSize: '14px', // Adjust font size as needed
                },
                thumb: {
                    color:"#3700b3",
                },
                track: {
                    color:"#3700b3",
                    borderColor: "#3Bad145782F6", // Example border color for the track
                    borderWidth: 0,
                    borderStyle: 'solid',
                    boxShadow: `0 0 0 2px #3700b3`, // Simulating border with shadow
                },
                rail: {
                    color: '#3700b3', // Example border color for the rail
                    // borderWidth: '2px',
                    // borderStyle: 'solid',
                    // boxShadow: `0 0 0 2px red`, // Simulating border with shadow
                },
                // Targeting the marks
                mark: {
                    backgroundColor: '#3700b3', // Example color for the marks
                    width: '4px',
                    height: '4px',
                    '&.MuiSlider-markActive': {
                        backgroundColor: '#eee', // Example color for active marks
                    },
                },
            },
        },
    }
});

export const signInTheme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#006db3',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#cF5C00',
            main: '#EF6C00',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        background: {
            default: 'white',
        },
        text: {
            primary: '#000'
        }
    },
});

export const plusPopOverTheme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#fff',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#fff',
            main: '#fff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        background: {
            default: '#2196f3',
            paper: 'inherit'
        },
        text: {
            primary: '#fff',
            secondary: "#bbb",
            disabled: "#999"
        },
    },
});
