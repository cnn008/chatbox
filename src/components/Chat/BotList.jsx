import PropTypes from 'prop-types'
import '../../styles/chat.css'

const BotList = ({ bots, activeBot, onSelect }) => {
  return (
    <div className="bot-list-container">
      <h3 className="bot-list-title">Available Bots</h3>
      <ul className="bot-list">
        {bots.map((bot) => (
          <li
            key={bot}
            className={`bot-item ${activeBot === bot ? 'active' : ''}`}
            onClick={() => onSelect(bot)}
            aria-current={activeBot === bot}
          >
            <span className="bot-icon">
              {bot === 'Tom' ? '🐱' : bot === 'Jerry' ? '🐭' : '🐶'}
            </span>
            <span className="bot-name">{bot}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

BotList.propTypes = {
  bots: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeBot: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default BotList