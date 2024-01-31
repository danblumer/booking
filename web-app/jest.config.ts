// jest.config.ts

export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
        },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)(\\?react)?$': '<rootDir>/src/test/__mocks__/fileMock.ts',
    },
    setupFilesAfterEnv: ['./jest.setup.ts'],
}