'use strict'
const repository = (container) => {
  const sendEmail = (payload) => {
    return new Promise((resolve, reject) => {
      const {smtpSettings, smtpTransport, nodemailer} = container.cradle

      const transporter = nodemailer.createTransport(
        smtpTransport({
          service: smtpSettings.service,
          auth: {
            user: smtpSettings.user,
            pass: smtpSettings.pass
          }
        }))

      const mailOptions = {
        from: '"Do Not Reply, Cinemas Company 👥" <no-replay@cinemas.com>',
        to: `${payload.user.email}`,
        subject: `Tickects for movie ${payload.movie.title}`,
        html: `
            <h1>Ticket(s) for ${payload.movie.title}</h1>
            <p>Cinema: ${payload.cinema.name}</p>
            <p>Room: ${payload.cinema.room}</p>
            <p>Seats: ${payload.cinema.seats}</p>
            <p>Description: ${payload.description}</p>
            <p>Total: ${payload.totalAmount}</p>
            <p>ID: ${payload.orderId}</p>
            <h3>Flicks Microserivces 2018, Enjoy your movie!</h3>
          `
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(new Error('An error occured sending an email, err:' + err))
        }
        transporter.close()
        resolve(info)
      })
    })
  }

  const sendSMS = (payload) => {
    // TODO: code for some sms service
  }

  return Object.create({
    sendSMS,
    sendEmail
  })
}

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container) {
      reject(new Error('dependencies not supplied!'))
    }
    resolve(repository(container))
  })
}

module.exports = Object.assign({}, {connect})