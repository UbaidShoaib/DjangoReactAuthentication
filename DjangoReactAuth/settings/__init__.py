from .base import *
from split_settings.tools import include, optional

include(optional("local.py"), scope=locals())
