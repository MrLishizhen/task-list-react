import styles from './index.module.less'
const Footer = ()=>{
    const icons = [
        {
            name:'联系我们',
            icon:'📨'
        },
        {
            name:'关于项目',
            icon:'👋'
        }
    ]
    return (
        <footer className={styles.footer}>
            {
                icons.map(u=>{
                    return <span key={u.name} className={styles.icon}><i className={styles.icon_i}>{u.icon}</i>{u.name}</span>
                })
            }
        </footer>
    )
}

export default Footer
