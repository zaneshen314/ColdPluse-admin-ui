// src/context/participationReducer.js
export const ACTION = {
    APPROVE: "APPROVE",
    REJECT: "REJECT",
    COMPLETE: "COMPLETE",
    MARK_ABSENT: "MARK_ABSENT",
    LOAD: "LOAD"
}

export const participationReducer = (state, action) => {
    switch (action.type) {
        case ACTION.APPROVE: {
            return {
                charityEvent: state.charityEvent, userParticipationRecResps: state.userParticipationRecResps.map(rec =>
                    rec.user.id === action.payload.userId
                        ? {...rec, charityEventParticipation: {...rec.charityEventParticipation, status: 'ENROLLED'}}
                        : rec
                )
            };
        }
        case ACTION.REJECT: {
            return {
                charityEvent: state.charityEvent, userParticipationRecResps: state.userParticipationRecResps.map(rec =>
                    rec.user.id === action.payload.userId
                        ? {...rec, charityEventParticipation: {...rec.charityEventParticipation, status: 'ENROLLED'}}
                        : rec
                )
            };
        }
        case ACTION.COMPLETE: {
            return {
                charityEvent: state.charityEvent, userParticipationRecResps: state.userParticipationRecResps.map(rec =>
                    rec.user.id === action.payload.userId
                        ? {...rec, charityEventParticipation: {...rec.charityEventParticipation, status: 'ENROLLED'}}
                        : rec
                )
            };
        }
        case ACTION.MARK_ABSENT: {
            return {
                charityEvent: state.charityEvent, userParticipationRecResps: state.userParticipationRecResps.map(rec =>
                    rec.user.id === action.payload.userId
                        ? {...rec, charityEventParticipation: {...rec.charityEventParticipation, status: 'ENROLLED'}}
                        : rec
                )
            };
        }
        case ACTION.LOAD: {
            return action.payload;
        }
        default:
            return state;
    }
};

export default participationReducer;