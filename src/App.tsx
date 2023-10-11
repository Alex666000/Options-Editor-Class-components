import {Component, CSSProperties} from 'react';

// data
const params: Param[] = [
    {id: 1, name: 'Назначение', type: 'string'},
    {id: 2, name: 'Длина', type: 'string'},
];

const initialModel: Model = {
    paramValues: [
        {paramId: 1, value: 'повседневное'},
        {paramId: 2, value: 'макси'},
    ],
};

// App
class App extends Component {
    render() {
        return (
            <div className="app">
                <ParamEditor params={params} model={initialModel}/>
            </div>
        );
    }
}

export default App;

// types
interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    editedModel: Model;
}

const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
};

const labelStyle: CSSProperties = {
    width: '150px',
    textAlign: 'right',
    marginRight: '10px',
};

const inputContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
};

const buttonStyle: CSSProperties = {
    marginLeft: '185px',
};

// ParamEditor
class ParamEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editedModel: {
                paramValues: [...props.model.paramValues]
            },
        };
    }

    updateParamValue = (paramId: number, value: string) => {
        const {editedModel} = this.state;

        const paramValueIndex = editedModel.paramValues.findIndex(
            (paramValue) => paramValue.paramId === paramId
        );

        if (paramValueIndex !== -1) {
            editedModel.paramValues[paramValueIndex] = {paramId, value};
            this.setState({editedModel});
        }
    };

    getModel = () => {
        return this.state.editedModel;
    };

    render() {
        const {editedModel} = this.state;

        return (
            <div style={containerStyle}>
                {params.map((param) => (
                    <div key={param.id} style={inputContainerStyle}>
                        <label
                            style={labelStyle}
                            htmlFor={`input-${param.id}`}
                        >
                            {param.name}
                        </label>
                        <input
                            type="text"
                            id={`input-${param.id}`}
                            value={
                                editedModel.paramValues.find(
                                    (paramValue) => paramValue.paramId === param.id
                                )?.value || ''
                            }
                            onChange={(e) => this.updateParamValue(param.id, e.target.value)}
                        />
                    </div>
                ))}
                <button
                    type="button"
                    style={buttonStyle}
                    onClick={() => {
                        this.getModel();
                        // console.log(this.getModel());
                    }}
                >
                    Получить Model
                </button>
            </div>
        );
    }
}




