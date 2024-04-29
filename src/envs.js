const envs = {
    withDeployment: window._env_.MODE,
    allowUpdatesOnProduction: window._env_.ALLOW_UPDATES_ON_PRODUCTION.includes('yes', 'true'),
    license: window._env_.LICENSE,
}

export default envs;