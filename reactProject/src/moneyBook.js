import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

// TODO:
export default class MoneyBook extends Component {
  constructor() {
    super();
    this.state = { books: [] };
  }
  componentDidMount() {
    this.setState({
      books: [
        { date: '1/1', item: 'お年玉', amount: 10000 },
        { date: '1/3', item: 'ケーキ', amount: -500 },
        { date: '2/1', item: '小遣い', amount: 3000 },
        { date: '2/5', item: 'マンガ', amount: -600 },
      ],
    });
  }
  addBook(date, item, amount) {
    const book = { date: date, item: item, amount: amount };
    this.setState({ books: this.state.books.concat(book) });
  }

  // FIXME:
  render() {
    return (
      <div>
        <Title>小遣い帳</Title>
        <MoneyBookList books={this.state.books} />
        <MoneyEntry add={(date, item, amount) => this.addBook(date, item, amount)} />
      </div>
    );
  }
}

const MoneyBookItem = (props) => {
  const { date, item, amount } = props.book;
  return (
    <tr>
      <td>{date}</td>
      <td>{item}</td>
      <td>{amount >= 0 ? amount : null}</td>
      <td>{amount < 0 ? amount : null}</td>
    </tr>
  );
};
MoneyBookItem.propTypes = {
  book: PropTypes.object.isRequired,
};

const Title = (props) => {
  return <h1>{props.children}</h1>;
};

Title.propTypes = {
  children: PropTypes.string,
};

/* controlled Component
class MoneyEntry extends Component {
  constructor() {
    super();
    this.state = { date: '', item: '', amount: '', paying: true };
  }
  onChangeValue(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangePayingIn(event) {
    this.setState({ paying: event.target.value == 'on' });
  }

  onClickSubmit() {
    this.props.add(
      this.state.date,
      this.state.item,
      this.state.amount * (this.state.paying ? 1 : -1)
    );
    this.setState({ date: '', item: '', amount: '', paying: true });
  }

  render() {
    return (
      <div className="entry">
        <fieldset>
          <legend>記帳</legend>
          <div>
            <input
              type="radio"
              value="on"
              checked={this.state.paying}
              onChange={(event) => this.onChangePayingIn(event)}
            />
            入金
            <input
              type="radio"
              value="off"
              checked={!this.state.paying}
              onChange={(event) => this.onChangePayingIn(event)}
            />
            出金
          </div>
          <div>
            日付:
            <input
              type="text"
              value={this.state.date}
              name="date"
              onChange={(e) => this.onChangeValue(e)}
              placeholder="3/15"
            />
          </div>
          <div>
            項目:
            <input
              type="text"
              value={this.state.item}
              name="item"
              onChange={(e) => this.onChangeValue(e)}
              placeholder="おこづかい"
            />
          </div>
          <div>
            金額:
            <input
              type="text"
              value={this.state.amount}
              name="amount"
              onChange={(e) => this.onChangeValue(e)}
              placeholder="1000"
            />
          </div>
          <div>
            <input type="submit" value="追加" onClick={() => this.onClickSubmit()} />{' '}
          </div>
        </fieldset>
      </div>
    );
  }
}
*/

/** Uncontrolled Component */
class MoneyEntry extends Component {
  constructor() {
    super();
    this.date = null;
    this.item = null;
    this.amount = null;
    this.paying = null;
    this.state = { itemArea: '', firstName: '0', basket: [] };
  }

  onClickSubmit() {
    this.props.add(
      this.date.value,
      this.item.value,
      this.amount.value * (this.paying.checked ? 1 : -1)
    );
    this.date.value = '';
    this.item.value = '';
    this.amount.value = '';
    this.paying.checked = true;
  }

  onChangeValue(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangeBasketValue(event) {
    this.setState({
      basket: Array.from(event.target.selected).map((e) => e.value)  ,
    });
  }

  render() {
    return (
      <div className="entry">
        <fieldset>
          <legend>記帳</legend>
          <div>
            <input
              type="radio"
              defaultChecked
              name="payingInOut"
              ref={(node) => (this.paying = node)}
            />
            入金
            <input type="radio" name="payingInOut" />
            出金
          </div>
          <div>
            日付:
            <input
              type="text"
              defaultValue=""
              ref={(node) => (this.date = node)}
              placeholder="3/15"
            />
          </div>
          <div>
            項目:
            <input
              type="text"
              defaultValue=""
              ref={(node) => (this.item = node)}
              placeholder="おこづかい"
            />
          </div>
          <div>
            金額:
            <input
              type="text"
              defaultValue=""
              ref={(node) => (this.amount = node)}
              placeholder="1000"
            />
          </div>
          <div>
            <input type="submit" value="追加" onClick={() => this.onClickSubmit()} />{' '}
          </div>
          <br />
          <div>
            備考：
            <textarea
              value={this.state.itemArea}
              name="itemArea"
              onChange={(e) => this.onChangeValue(e)}
              placeholder="備考"
            ></textarea>
          </div>
          <br />
          <div>
            苗字：
            <select
              value={this.state.firstName}
              name="firstName"
              onChange={(e) => this.onChangeValue(e)}
            >
              <option value="0">選択してください</option>
              <option value="1">佐藤</option>
              <option value="2">斎藤</option>
              <option value="3">斎藤</option>
              <option value="4">鈴木</option>
              <option value="5">我妻</option>
            </select>
          </div>
          <br />
          <div>
            好きな果物：
            <select
              value={this.state.basket}
              name="basket"
              onChange={(e) => this.onChangeBasketValue(e)}
            >
              <option value="A">Orange</option>
              <option value="B">Apple</option>
              <option value="C">Grape</option>
              <option value="D">Banana</option>
              <option value="E">Mango</option>
            </select>
          </div>
          <br />
          state.itemArea={this.state.itemArea},state.firstName={this.state.firstName},state.basket=
          {this.state.basket.join(',')}
        </fieldset>
      </div>
    );
  }
}

MoneyEntry.propTypes = {
  add: PropTypes.func.isRequired,
};

const MoneyBookList = (props) => {
  return (
    <table className="book">
      <thead data-type="ok">
        <tr>
          <th width="34px">日付</th>
          <th width="50px">項目</th>
          <th width="52px">入金</th>
          <th width="39px">出金</th>
        </tr>
      </thead>
      <tbody>
        {props.books.map((book) => (
          <MoneyBookItem book={book} key={book.date + book.item} />
        ))}
      </tbody>
    </table>
  );
};

MoneyBookList.propTypes = {
  books: PropTypes.array.isRequired,
};
