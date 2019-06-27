export const sumPaidValues = (participants) => {
  const total = participants.reduce((memo, participant) => {
    if (participant.paid) {
      return memo + participant.valueToPay
    }
    return memo
  }, 0)

  return total
}

export const sumTotalValues = (participants) =>
  participants.reduce((memo, participant) => memo + participant.valueToPay, 0)

export const  calculateWhoWillDrink = (participants) => {
  const total = participants.reduce((memo, participant) => {
    if (participant.willDrink) {
      return ++memo
    }
    return memo
  }, 0)

  return total
}

export const calculateWhoWillNotDrink = (participants) => {
  const total = participants.reduce((memo, participant) => {
    if (!participant.willDrink) {
      return ++memo
    }
    return memo
  }, 0)

  return total
}
