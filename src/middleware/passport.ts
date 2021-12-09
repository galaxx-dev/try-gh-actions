// import { ExtractJwt, Strategy as JWTStrategy, StrategyOptions } from 'passport-jwt'
// import { Strategy as LocalStrategy, IStrategyOptions } from 'passport-local'
// import prismaClient from '../helpers/prismaHelper'

// // TODO:
// const getLocalStrategy = () => {
//   const opts: IStrategyOptions = {
//     usernameField: 'email',
//     passwordField: 'email',
//   }

//   const localStrategy = new LocalStrategy(opts, async (email, password, done) => {
//     try {
//       const user = await prismaClient.user.findUnique({ where: { email } })

//       if (!user) {
//         return done(null, false, {message: 'This user is not registered'})
//       }

//       return done(null, user, {message: 'Login success.'})
//     } catch (e) {
//       return done(e, null, { message: 'Error connecting to database' })
//     }
//   })

//   return localStrategy
// }

// /**
//  * @param db
//  * @param settings
//  * @returns
//  */
// // TODO:
// const getJwtStrategy = () => {
//   const opts: StrategyOptions = {
//     secretOrKey: process.env.JWT_SECRET as string,
//     algorithms: [process.env.JWT_ALGORITHM as string],
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   }

//   const jwtStrategyFunc = new JWTStrategy(opts, async (payload, done) => {
//     console.log('payload: ', payload)

//     try {
//       const user = await prismaClient.user.findUnique({ where: { email: '1@1.com' } })

//       if (!user) {
//         return done(null, false, { message: 'This user is not registered' })
//       }

//       return done(null, user)
//     } catch (e) {
//       return done(e, null, { message: 'Error connecting to database' })
//     }
//   })

//   return jwtStrategyFunc
// }

// export { getJwtStrategy, getLocalStrategy }
