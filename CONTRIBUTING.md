# Contributing to AI Meeting Assistant

Thank you for your interest in contributing! This project was developed as part of the Governor House IT Initiative Programme.

## How to Contribute

### Reporting Bugs
- Use the GitHub Issues tab
- Include steps to reproduce
- Include error messages and logs
- Specify your environment (OS, Python version, Node version)

### Suggesting Features
- Open an issue with the "enhancement" label
- Describe the feature and use case
- Explain why it would be useful

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Code Style
- **Backend:** Follow PEP 8 (Python)
- **Frontend:** Use Prettier (auto-formats on save)
- Write clear commit messages
- Add comments for complex logic

### Testing
- Test all features before submitting PR
- Ensure both backend and frontend work
- Check that no existing features break

## Questions?
Feel free to open an issue for any questions!

## License
By contributing, you agree that your contributions will be licensed under the MIT License.
